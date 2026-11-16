from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math

OUT=Path(__file__).parent
REG='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
BOLD='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
INK='#112B43'; MUTED='#52677A'; TEAL='#087F8C'; LINE='#90A7BA'
def font(n,b=False): return ImageFont.truetype(BOLD if b else REG,n)
def base(k,title,subtitle,h):
    im=Image.new('RGB',(1440,h),'#F3F7FA'); d=ImageDraw.Draw(im)
    d.rounded_rectangle((64,58,270,107),radius=20,fill=TEAL)
    d.text((85,63),'ZIYIN · '+k,font=font(25,True),fill='white')
    d.text((64,134),title,font=font(45,True),fill=INK)
    d.text((67,207),subtitle,font=font(27),fill=MUTED)
    d.line((64,h-115,1376,h-115),fill='#C9D8E3',width=2)
    d.text((65,h-85),'建议框架 · 非已上线能力声明',font=font(25),fill=MUTED)
    d.text((850,h-85),'瑜秀瞳芯｜www.chcomct.cn',font=font(25),fill=MUTED)
    return im,d
def box(d,xy,title,lines,accent=TEAL):
    x,y,x2,y2=xy
    d.rounded_rectangle(xy,radius=22,fill='white',outline='#D3DFE8',width=2)
    d.rounded_rectangle((x,y,x+8,y2),radius=4,fill=accent)
    d.text((x+28,y+19),title,font=font(31,True),fill=INK)
    for i,t in enumerate(lines): d.text((x+28,y+72+i*42),t,font=font(27),fill=MUTED)
def arrow(d,pts,color=LINE):
    d.line(pts,fill=color,width=5,joint='curve')
    (x0,y0),(x,y)=pts[-2:]; a=math.atan2(y-y0,x-x0)
    p=[(x,y),(x-17*math.cos(a-.45),y-17*math.sin(a-.45)),(x-17*math.cos(a+.45),y-17*math.sin(a+.45))]
    d.polygon(p,fill=color)

im,d=base('01','可靠交付：让任务、版本与设备彼此对应','来源可核验 → 状态可恢复 → 执行可追溯',1450)
box(d,(90,285,1350,435),'01 统一接收与来源核验',['影像输入 / 已有人工模型 · 保存订单 · 返回任务编号'])
arrow(d,[(720,440),(720,480)])
box(d,(90,485,1350,675),'02 持久化业务状态与版本关联',['订单、阶段、执行者、成果版本、审核对象、异常与恢复位置',
'同一操作稳定标识 · 明确执行资格 · 保留事件与失败证据'])
for cx in (300,720,1140): arrow(d,[(cx,680),(cx,725)])
box(d,(90,730,510,920),'建模 / 设计任务',['按输入选择工序','GPU / 工程师容量'])
box(d,(540,730,930,920),'切片准备任务',['绑定成果与参数','CPU / 内存容量'])
box(d,(960,730,1350,920),'生产派发任务',['核对放行与物料','设备状态与容量'])
for cx in (300,720,1140): arrow(d,[(cx,925),(cx,965)])
box(d,(90,970,1350,1160),'03 受控衔接与结果确认',['专业复核绑定版本 · 下游只接收满足前置条件的任务',
'派发待确认 → 核对设备事实；设备完成 → 实物检验 → 交付'])
d.rounded_rectangle((90,1190,1350,1270),radius=16,fill='#E1EFF2')
d.text((120,1209),'过程事件与设备回执持续更新业务状态，形成下一次接续依据。',font=font(28,True),fill=TEAL)
im.save(OUT/'architecture.png')

im,d=base('02','没有收到回执，不等于没有开始打印','先核对执行事实，再决定后续动作',1550)
box(d,(90,285,830,435),'01 派发前保存执行意图',['生产尝试 · 文件版本 · 目标设备 · 请求标识'])
arrow(d,[(460,440),(460,485)])
box(d,(90,490,830,640),'02 调用设备接口',['记录响应；超时或断联时保留不确定性'])
arrow(d,[(460,645),(460,700)],TEAL)
d.text((480,655),'收到可核验的接收回执',font=font(24),fill=TEAL)
box(d,(90,705,830,855),'03 设备执行与完成回执',['关联真实作业；继续记录进度与异常'])
arrow(d,[(460,860),(460,910)])
box(d,(90,915,830,1065),'04 实物检验与交付',['设备完成 ≠ 实物合格；按实际结果处理'])
box(d,(930,490,1350,735),'派发结果待确认',['超时 / 回执丢失','禁止盲目重发','查询作业与派发凭据'],'#B76A14')
arrow(d,[(835,565),(925,565)],'#B76A14')
arrow(d,[(1140,740),(1140,800)],'#B76A14')
box(d,(930,805,1350,1065),'核对后的处理',['已接收：关联原作业','未能确认：现场核实','需补打：新受控尝试'],'#B76A14')
arrow(d,[(930,840),(875,840),(875,780),(835,780)],TEAL)
box(d,(90,1130,1350,1325),'重试与补打必须区分',['重试：同一业务操作，沿用稳定请求标识，核对已有结果。',
'补打：新的业务意图，记录原因、必要授权与新的生产尝试。'])
im.save(OUT/'dispatch.png')
print('Created architecture.png and dispatch.png')
