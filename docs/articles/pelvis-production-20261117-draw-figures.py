"""Public deidentified engineering figures, using only aggregate measurements."""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

R=Path(__file__).parent
OUT=R/'figures'; OUT.mkdir(exist_ok=True)
FONT=FontProperties(fname='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc')
NAVY='#18354a'; BLUE='#126b95'; TEAL='#087f79'; INK='#223e51'; MUTED='#5a6e7c'; AMBER='#9b5b08'
plt.rcParams.update({'axes.unicode_minus':False,'svg.fonttype':'path'})
def text(ax,x,y,t,size=20,color=INK,ha='center',weight='normal'):
    return ax.text(x,y,t,fontproperties=FONT,fontsize=size,color=color,ha=ha,va='center',weight=weight,linespacing=1.5)
def box(ax,x,y,w,h,title,subtitle=None,color=BLUE,fill='#eef6fb'):
    ax.add_patch(FancyBboxPatch((x-w/2,y-h/2),w,h,boxstyle='round,pad=0.02,rounding_size=.14',facecolor=fill,edgecolor=color,lw=1.5))
    text(ax,x,y+(0.17 if subtitle else 0),title,23,color)
    if subtitle:text(ax,x,y-.27,subtitle,15,MUTED)
def arrow(ax,a,b,color=BLUE):
    ax.add_patch(FancyArrowPatch(a,b,arrowstyle='-|>',mutation_scale=22,lw=2.4,color=color))
def base(height,title,subtitle):
    fig,ax=plt.subplots(figsize=(14,height),dpi=100)
    fig.patch.set_facecolor('white');ax.set_position([0,0,1,1]);ax.set_xlim(0,14);ax.set_ylim(0,height);ax.axis('off')
    text(ax,.65,height-.6,title,27,NAVY,'left')
    text(ax,.65,height-1.15,subtitle,16,MUTED,'left')
    return fig,ax
def save(fig,name):
    fig.savefig(OUT/(name+'.png'),dpi=100,facecolor='white')
    fig.savefig(OUT/(name+'.svg'),facecolor='white')
    plt.close(fig)

fig,ax=base(9,'五件模型 · 七对连接','预定义的插杆—插孔配对关系  |  同一病例，不代表五例独立验证')
box(ax,7,6.75,3.0,1.05,'骶骨','4 个插杆')
box(ax,3.05,4.35,3.4,1.1,'左髋骨','4 个插孔')
box(ax,10.95,4.35,3.4,1.1,'右髋骨','3 个插孔 + 1 个插杆')
box(ax,3.05,1.85,3.4,1.1,'左股骨','1 个插杆 + 完整桥臂',TEAL,'#edf8f5')
box(ax,10.95,1.85,3.4,1.1,'右股骨','1 个插杆 + 完整桥臂',TEAL,'#edf8f5')
arrow(ax,(5.9,6.2),(3.9,4.95)); arrow(ax,(8.1,6.2),(10.1,4.95))
text(ax,3.55,5.85,'左骶髂 2 对',18,BLUE);text(ax,10.45,5.85,'右骶髂 2 对',18,BLUE)
arrow(ax,(9.2,4.35),(4.8,4.35));text(ax,7,4.85,'耻骨 1 对',18,BLUE)
arrow(ax,(3.05,2.45),(3.05,3.75),TEAL);arrow(ax,(10.95,2.45),(10.95,3.75),TEAL)
text(ax,5.15,3.1,'小转子—坐骨结节\n同侧 1 对',16,TEAL)
text(ax,8.85,3.1,'小转子—坐骨结节\n同侧 1 对',16,TEAL)
text(ax,7,.55,'箭头：插杆归属 → 插孔归属。仅为关系示意，不表示解剖比例或临床置钉位置。',15,MUTED)
save(fig,'connections')

fig,ax=base(10,'离线诊断通过，不能替代正式核验','本例整体几何未通过；五盘真实刀路在离线诊断模式下完成技术检查')
box(ax,7,8.05,12.2,.8,'共同的来源与版本绑定','',BLUE)
arrow(ax,(3.7,7.58),(3.7,6.97));arrow(ax,(10.3,7.58),(10.3,6.97))
box(ax,3.7,6.15,5.65,1.55,'正式几何：未通过','拓扑 / 配对 / 尺寸子项通过\n装配路径未通过',AMBER,'#fff5e6')
box(ax,10.3,6.15,5.65,1.55,'离线诊断','保留正式阻断\n继续研究摆放与支撑',BLUE)
arrow(ax,(3.7,5.34),(3.7,4.75),AMBER);arrow(ax,(10.3,5.34),(10.3,4.75),TEAL)
box(ax,3.7,3.95,5.65,1.4,'正式工程 / 切片凭证','尚未通过',AMBER,'#fff5e6')
box(ax,10.3,3.95,5.65,1.4,'五盘刀路技术检查','诊断通过；非正式生产凭证',TEAL,'#edf8f5')
arrow(ax,(3.7,3.2),(3.7,2.25),AMBER);arrow(ax,(10.3,3.2),(10.3,2.25),AMBER)
box(ax,7,1.5,12.2,1.42,'整例制造：仍未放行','骶骨实物复验  ·  左股骨制造位移复核  ·  右股骨装配路径',AMBER,'#fff5e6')
text(ax,7,.36,'软件检查已接入生产流程；本轮未下发新的真实打印指令。',16,MUTED)
save(fig,'verification')

fig=plt.figure(figsize=(14,8.5),dpi=100,facecolor='white')
fig.text(.06,.93,'同一左髋：孔腔支撑交集的修正前后比较',fontproperties=FONT,fontsize=26,color=NAVY)
fig.text(.06,.87,'指标：逐层孔腔—支撑足迹交集面积之和；未乘层高',fontproperties=FONT,fontsize=18,color=MUTED)
ax=fig.add_axes([.14,.25,.78,.53])
ax.bar([0,1],[8.9165556552772,0],width=.42,color=['#c47549',TEAL],zorder=3)
ax.scatter([1],[0],s=110,color=TEAL,zorder=5,clip_on=False)
ax.set_ylim(0,10);ax.set_xlim(-.6,1.6);ax.set_xticks([0,1])
ax.set_xticklabels(['修正前','共同调整朝向后'],fontproperties=FONT,fontsize=20)
ax.set_ylabel('累计交集面积（mm²）',fontproperties=FONT,fontsize=18,labelpad=18)
ax.tick_params(axis='y',labelsize=15);ax.grid(axis='y',color='#dce5eb',zorder=0)
for sp in ['right','top']:ax.spines[sp].set_visible(False)
ax.spines['left'].set_color('#acbcc6');ax.spines['bottom'].set_color('#acbcc6')
text(ax,0,9.35,'8.9166',24,'#a9552d');text(ax,1,.7,'0',25,TEAL)
fig.text(.06,.13,'单病例数字结果；0 表示在定义检查域、层筛选及容差内未检出交集。',fontproperties=FONT,fontsize=18,color=INK)
fig.text(.06,.07,'不是支撑体积、材料密度或实物残留量；候选尚未完成实物重印与装配复验。',fontproperties=FONT,fontsize=17,color=MUTED)
save(fig,'support-comparison')
print('Saved 3 PNG + 3 SVG figures')
