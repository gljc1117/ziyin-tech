from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math
O=Path(__file__).parent
F='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
B='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
navy='#112B50'; blue='#2164B6'; teal='#087C80'; amber='#A35D10'; ink='#26364A'; muted='#607286'; line='#C8D6E4'
def font(n,b=False): return ImageFont.truetype(B if b else F,n)
def base(h,no,title,sub):
 im=Image.new('RGB',(1080,h),'#F5F8FC'); d=ImageDraw.Draw(im)
 d.rectangle((0,0,1080,220), fill=navy)
 d.text((56,28),'子殷科技  /  组织研发实践',font=font(29),fill='#A6D7ED')
 d.text((56,80),title,font=font(52,True),fill='white')
 d.text((56,158),sub,font=font(30),fill='#DCEAF8')
 d.text((56,h-96),f'图 {no}  ·  作者：瑜秀瞳芯',font=font(29),fill=muted)
 d.text((56,h-53),'www.chcomct.cn',font=font(29),fill=blue)
 return im,d
def box(d,xy,title,lines,color=blue,fill='white',tag=None,ts=42,bs=34):
 x,y,x2,y2=xy; d.rounded_rectangle(xy,radius=20,fill=fill,outline=line,width=2)
 d.rounded_rectangle((x,y,x+9,y2),radius=4,fill=color)
 d.text((x+30,y+21),title,font=font(ts,True),fill=color)
 for i,s in enumerate(lines): d.text((x+30,y+82+i*(bs+13)),s,font=font(bs),fill=ink)
def arr(d,pts,color=blue,w=5):
 d.line(pts,fill=color,width=w,joint='curve')
 x,y=pts[-1]; x0,y0=pts[-2]; a=math.atan2(y-y0,x-x0)
 d.polygon([(x,y),(x-18*math.cos(a-.5),y-18*math.sin(a-.5)),(x-18*math.cos(a+.5),y-18*math.sin(a+.5))],fill=color)
im,d=base(1740,1,'实验转化为研发资产的路线','建议方法框架  ·  不代表所有环节已完成')
steps=[('01  明确问题','用途、对象、假设与验收标准'),('02  冻结实验条件','输入、版本、参数与环境'),('03  执行并留痕','自动输出、人工修正、失败原貌'),('04  分层验证','数字检查、实物检查、专业复核'),('05  形成设计决策','采用或退回，以及依据和边界'),('06  归档与复用','版本快照、交接、回归与再验证')]
for i,(a,b) in enumerate(steps):
 y=270+i*194; box(d,(70,y,900,y+152),a,[b],teal if i==5 else blue)
 if i<5: arr(d,[(480,y+154),(480,y+191)])
arr(d,[(902,1122),(990,1122),(990,540),(904,540)],color=amber)
d.text((946,730),'修',font=font(31,True),fill=amber);d.text((946,775),'正',font=font(31,True),fill=amber);d.text((946,820),'重',font=font(31,True),fill=amber);d.text((946,865),'验',font=font(31,True),fill=amber)
d.rounded_rectangle((70,1470,1010,1590),radius=18,fill='#E7F3F2')
d.text((100,1491),'成功与失败都保留；新版本不覆盖旧证据。',font=font(36,True),fill=teal)
d.text((100,1543),'每项结论注明“已证实”与“待验证”。',font=font(33),fill=ink)
im.save(O/'fig1_research_route.png',optimize=True)
im,d=base(1680,2,'一次实验如何被追溯','建议关联结构  ·  标识均为示意，不是病例数据')
box(d,(70,265,1010,420),'病例／样件编号 + 任务编号',['定位同一对象及本次研发任务'])
arr(d,[(540,423),(540,465)])
box(d,(70,470,1010,625),'实验批次 + 冻结版本',['绑定输入、方法、参数和评价条件'])
arr(d,[(540,628),(540,670),(290,670),(290,715)])
arr(d,[(540,670),(790,670),(790,715)])
box(d,(70,720,510,920),'尝试 01',['保留原始结果','记录失败与原因'],amber,bs=34,ts=40)
box(d,(570,720,1010,920),'尝试 02',['保存修正后版本','记录新的验证结论'],teal,bs=34,ts=40)
d.text((70,1514),'每次重试新增记录，保留前后关系。',font=font(34,True),fill=navy)
arr(d,[(290,923),(290,1010),(540,1010),(540,1050)],color=muted)
arr(d,[(790,923),(790,1010),(540,1010)],color=muted)
box(d,(70,1055,1010,1370),'每次尝试关联四类证据',['输入与产物：来源、文件摘要、前后版本','过程与人员：操作、修正、有效工时','设备与实物：回执、尺寸、照片、装配','判断与用途：标准、验收人、适用边界'],bs=34)
d.text((70,1410),'系统采集可获取的信息，工程师补充现场事实。',font=font(34),fill=ink)
d.text((70,1462),'原位引用需单独标记，不能当作已完成备份。',font=font(34),fill=amber)
im.save(O/'fig2_traceability.png',optimize=True)
im,d=base(1600,3,'从归档基础走向可复用证据','事实与计划分开  ·  首轮归档数据截至 2026.11.14')
box(d,(70,265,1010,555),'已形成｜首轮历史归档',['188 个来源批次 · 12,874 个选取文件','另有 2,031 项原位引用，未计作已备份','依据：历史索引与归档运行记录'],teal,fill='#EBF7F5',bs=34)
arr(d,[(540,558),(540,612)],color=muted)
box(d,(70,617,1010,945),'待补齐｜实验关联与现场反馈',['病例、任务、部件、打印尝试的对应','实物尺寸、装配照片、返工与人工工时','验收责任人及每项结论的适用范围','注：来源批次不等于病例或实验次数'],amber,fill='#FFF7EB',bs=34)
arr(d,[(540,948),(540,1002)],color=muted)
box(d,(70,1007,1010,1295),'待验证｜复用能力与实际效果',['独立工程师复现、检索与恢复演练','修复后的回归结果、记录负担与效率','尚无证据证明这些效果已改善'],blue,fill='#EDF4FE',bs=34)
d.rounded_rectangle((70,1335,1010,1450),radius=18,fill=navy)
d.text((100,1350),'面向后续申报：按用途与版本逐项核对。',font=font(35,True),fill='white')
d.text((100,1400),'补齐必要验证，不能用文件数量证明充分性。',font=font(32),fill='#DAE8F7')
im.save(O/'fig3_evidence_status.png',optimize=True)
for p in sorted(O.glob('*.png')):
 im=Image.open(p).quantize(colors=128,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE)
 im.save(p,optimize=True)
 print(p.name,im.size,p.stat().st_size)
