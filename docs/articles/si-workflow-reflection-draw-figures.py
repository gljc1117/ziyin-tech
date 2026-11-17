from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, math, zipfile, base64, hashlib

ROOT=Path(__file__).parent
A=json.loads((ROOT/('article.json' if (ROOT/'article.json').exists() else 'si-workflow-reflection-source.json')).read_text(encoding='utf-8'))
PKG=ROOT/'publication'
FIG=PKG/'public/images/news/si-workflow-reflection-20261117'
FIG.mkdir(parents=True,exist_ok=True)
FONT=next(p for p in ['/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc','C:/Windows/Fonts/msyh.ttc'] if Path(p).exists())
BOLD=next(p for p in ['/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc','C:/Windows/Fonts/msyhbd.ttc'] if Path(p).exists())
NAVY='#16324E'; TEAL='#087B81'; MUTED='#52697E'; LINE='#8097AB'
def font(s,b=False):return ImageFont.truetype(BOLD if b else FONT,s)
def make(h):
    im=Image.new('RGB',(1600,h),'#F5F8FC');return im,ImageDraw.Draw(im)
def text(d,x,y,t,s=32,c=NAVY,b=False):d.text((x,y),t,font=font(s,b),fill=c)
def center(d,x,y,t,s=32,c=NAVY,b=False):
    w=d.textbbox((0,0),t,font=font(s,b))[2];text(d,x-w/2,y,t,s,c,b)
def box(d,xy,title,sub='',fill='white',s=34):
    d.rounded_rectangle(xy,18,fill=fill,outline='#C8D7E3',width=2)
    x=(xy[0]+xy[2])/2
    center(d,x,xy[1]+14,title,s,b=True)
    if sub:center(d,x,xy[1]+64,sub,27,MUTED)
def arrow(d,pts,c=LINE,width=4):
    d.line(pts,fill=c,width=width,joint='curve')
    x,y=pts[-1];x0,y0=pts[-2];theta=math.atan2(y-y0,x-x0)
    d.polygon([(x,y),(x-15*math.cos(theta-.48),y-15*math.sin(theta-.48)),(x-15*math.cos(theta+.48),y-15*math.sin(theta+.48))],fill=c)

im,d=make(1180)
text(d,70,34,'AI 初稿 · 人工判断 · 同单接续',48,b=True)
text(d,70,108,'图1  单一默认主流程及审核修正回路',31,MUTED)
box(d,(90,190,890,305),'影像与任务需求','检查输入、任务适用性与授权范围')
box(d,(90,365,890,480),'SI 调用 AI 建模','保存初稿及程序、配置版本',fill='#E5F1F3')
box(d,(90,540,890,655),'工程师审核','按任务要求检查，保留必要专业确认')
box(d,(90,720,890,835),'审核通过的当前版本','切片与实际刀路核验；满足制造放行条件',fill='#E5F1F3',s=33)
box(d,(90,900,890,1015),'打印、回执与交付复核','分别记录发送、完成及验收状态')
for a,b in [(305,365),(480,540),(835,900)]:arrow(d,[(490,a),(490,b)])
arrow(d,[(490,655),(490,720)],TEAL)
text(d,515,670,'通过',28,TEAL,True)
box(d,(1050,520,1510,650),'原任务内修订','回传新版本，再次复核',fill='#FFF0DC')
arrow(d,[(890,577),(1050,577)],'#A46A23')
center(d,968,535,'需修改',27,'#885A20')
arrow(d,[(1280,650),(1280,686),(785,686),(785,655)],'#A46A23')
box(d,(1050,190,1510,320),'异常处理／人工兜底','不适用、失败或难以修正',fill='#FFF0DC',s=30)
arrow(d,[(890,248),(1050,248)],'#A46A23')
arrow(d,[(890,420),(978,420),(978,295),(1050,295)],'#A46A23')
arrow(d,[(1280,320),(1280,470),(938,470),(938,618),(890,618)],'#A46A23')
text(d,1005,350,'处理后回到原任务',27,MUTED)
text(d,1050,755,'一份订单 · 多个受控版本',29,b=True)
text(d,1050,810,'不重复建单或补录',29,MUTED)
text(d,1050,860,'不以点击代替文件回传',29,MUTED)
text(d,1050,910,'不将旧版审核套到新版',29,MUTED)
d.line((70,1070,1530,1070),fill='#CEDAE5',width=2)
text(d,70,1090,'设计方案示意，不表示整条链路已经上线或获得病例放行。',29,MUTED)
text(d,70,1134,'子殷科技  |  瑜秀瞳芯  |  2026-11-17  |  www.chcomct.cn',24,MUTED)
im.save(FIG/'workflow.png')

im,d=make(1000)
text(d,70,35,'让后台保存复杂性，让人员看清当前任务',44,b=True)
text(d,70,107,'图2  同一订单内的版本与生产证据绑定',31,MUTED)
labels=[('审核通过模型','文件＋版本＋审核结论'),('切片产物','配置＋切片包＋核验'),('实际发印','绑定下发文件与任务'),('回执与交付','设备状态＋实物复核')]
for i,(t,s) in enumerate(labels):
    x=70+i*390
    box(d,(x,230,x+320,365),t,s,fill='#E5F1F3' if i==0 else 'white',s=34)
    if i<3:arrow(d,[(x+320,298),(x+390,298)])
center(d,800,178,'同一订单身份贯穿各工序',30,b=True)
d.rounded_rectangle((70,425,1530,523),18,fill=NAVY)
center(d,800,448,'上游完成，不自动证明下游成功；每一项状态各有证据',34,'white',True)
labels2=[('产生修订版','保留 AI 初稿与历史版本'),('重新建立证据','旧审核、旧刀路不得套用'),('使用新审核版','同步下游绑定关系')]
for i,(t,s) in enumerate(labels2):
    x=95+i*510
    box(d,(x,630,x+420,765),t,s,fill='#FFF0DC',s=33)
    if i<2:arrow(d,[(x+420,697),(x+510,697)],'#A46A23')
center(d,800,573,'模型或需求改变时',32,b=True)
center(d,800,820,'原始输入只读保存  ·  修订可追溯  ·  异常可恢复',32,b=True)
d.line((70,895,1530,895),fill='#CEDAE5',width=2)
text(d,70,912,'方法示意；不包含患者信息，也不代表已完成全部验证。',28,MUTED)
text(d,70,956,'子殷科技  |  瑜秀瞳芯  |  www.chcomct.cn',24,MUTED)
im.save(FIG/'version-chain.png')

ts=PKG/'src/lib/si-human-ai-workflow-reflection.ts'
ts.parent.mkdir(parents=True,exist_ok=True)
ts.write_text('import type { CompanyNewsArticle } from "./company-news";\n\nexport const SI_HUMAN_AI_WORKFLOW_REFLECTION: CompanyNewsArticle = '+json.dumps(A,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
md=['# '+A['title'],'','作者：瑜秀瞳芯｜内蒙古子殷科技有限公司','日期：2026年11月17日','类型：工程反思与验证方法文章；未经期刊同行评审。','',f"![{A['cover']['alt']}]({A['cover']['url']})",'']
for s in A['sections']:
    md+=['## '+s['heading'],'']
    for p in s['paragraphs']:md +=[p,'']
    if s['heading'] in A['sectionTables']:
        t=A['sectionTables'][s['heading']]
        md += [t['caption'],'','| '+' | '.join(t['columns'])+' |','| '+' | '.join(['---']*len(t['columns']))+' |']
        md += ['| '+' | '.join(row)+' |' for row in t['rows']]+['']
    if s['heading'] in A['sectionImages']:
        p=A['sectionImages'][s['heading']];md += [f"![{p['alt']}]({p['url']})",'']
md+=['## 参考文献','']
for i,r in enumerate(A['references'],1):md +=[f"[{i}] {r['title']} [{r['linkLabel']}]({r['url']})",'']
mdp=PKG/('docs/articles/'+A['id']+'.md');mdp.parent.mkdir(parents=True,exist_ok=True);mdp.write_text('\n'.join(md),encoding='utf-8')
source=PKG/'docs/articles/si-workflow-reflection-draw-figures.py'
source.write_text(Path(__file__).read_text(),encoding='utf-8')
# The generator's source JSON is included for reproducible article and figures.
(source.parent/'si-workflow-reflection-source.json').write_text(json.dumps(A,ensure_ascii=False,indent=2),encoding='utf-8')
with zipfile.ZipFile(ROOT/'public-article.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in PKG.rglob('*'):
        if p.is_file():z.write(p,p.relative_to(PKG).as_posix())
b=(ROOT/'public-article.zip').read_bytes()
(ROOT/'public-article.b64').write_text(base64.b64encode(b).decode())
print(json.dumps({'article':A['id'],'files':len([p for p in PKG.rglob('*') if p.is_file()]),'zip_bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()},ensure_ascii=False))
