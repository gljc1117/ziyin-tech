"""Render a static scientific preview from the existing public lung demo.

Only explicitly listed public meshes are downloaded. No patient data is read.
Run with Python + vtk; output is a display preview, not a clinical result.
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import hashlib
import json
import urllib.request
import vtk

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".qa/public-demo-meshes"
CACHE.mkdir(parents=True, exist_ok=True)
BASE = "https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models/lung-case/"
COLORS = {"right_upper_lobe": (0.27, .76, .86), "right_middle_lobe": (.96, .68, .33),
          "right_lower_lobe": (.34, .62, .88), "left_upper_lobe": (.56, .75, .71),
          "left_lower_lobe": (.68, .62, .84), "trachea": (.92, .92, .89)}

def fetch(name):
    path = CACHE / (name + ".stl")
    if not path.exists():
        with urllib.request.urlopen(BASE + name + ".stl", timeout=60) as r:
            path.write_bytes(r.read())
    return name, path

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from vtk.util.numpy_support import vtk_to_numpy
fig = plt.figure(figsize=(12,10), facecolor="#0A1628")
ax = fig.add_subplot(111, projection="3d", computed_zorder=False)
ax.set_facecolor("#0A1628"); ax.set_proj_type("ortho")
records, bounds, geometry, facecolors = [], [], [], []
for name, path in ThreadPoolExecutor(max_workers=3).map(fetch, COLORS):
    reader = vtk.vtkSTLReader(); reader.SetFileName(str(path)); reader.Update()
    mesh = reader.GetOutput()
    if mesh.GetNumberOfCells() == 0: raise ValueError("Empty mesh: " + name)
    dec = vtk.vtkDecimatePro(); dec.SetInputData(mesh); dec.SetTargetReduction(.96); dec.PreserveTopologyOn(); dec.Update()
    simplified = dec.GetOutput()
    vertices = vtk_to_numpy(simplified.GetPoints().GetData())
    faces = vtk_to_numpy(simplified.GetPolys().GetData()).reshape(-1,4)[:,1:]
    triangles = vertices[faces]
    normals = np.cross(triangles[:,1]-triangles[:,0],triangles[:,2]-triangles[:,0])
    normals /= np.maximum(np.linalg.norm(normals,axis=1,keepdims=True),1e-8)
    light = np.array([-.3,-.5,.8]); light /= np.linalg.norm(light)
    shade = .66 + .34*np.maximum(normals@light,0)
    colors = np.column_stack([np.asarray(COLORS[name])*shade[:,None],np.ones(len(shade))])
    geometry.append(triangles); facecolors.append(colors)
    bounds.append([vertices.min(axis=0),vertices.max(axis=0)])
    records.append({"source": BASE + name + ".stl", "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "source_triangles": mesh.GetNumberOfCells(), "preview_triangles":len(faces)})
ax.add_collection3d(Poly3DCollection(np.concatenate(geometry),facecolors=np.concatenate(facecolors),edgecolors="none",antialiased=False,rasterized=True,zsort="average"))
low=np.min(np.asarray(bounds)[:,0],axis=0); high=np.max(np.asarray(bounds)[:,1],axis=0)
center=(low+high)/2; span=(high-low).max()*.55
ax.set_xlim(center[0]-span,center[0]+span);ax.set_ylim(center[1]-span,center[1]+span);ax.set_zlim(center[2]-span,center[2]+span)
ax.set_box_aspect((1,1,1),zoom=1.3); ax.view_init(elev=12,azim=-85); ax.set_axis_off()
fig.subplots_adjust(left=0,right=1,bottom=0,top=1)
out = ROOT / "public/images/demos/lung-preview.png"; out.parent.mkdir(parents=True, exist_ok=True)
fig.savefig(out,dpi=100,facecolor=fig.get_facecolor())
(ROOT / "docs/lung-preview-provenance.json").write_text(json.dumps({"description": "Display-only rendering of the existing public lung-case demo: five lobes and trachea, decimated for a static preview. Original public meshes remain unchanged; other structures are available interactively.", "meshes": records}, ensure_ascii=False, indent=2))
print("Rendered", out, "bounds", low.tolist(),high.tolist(),flush=True)
