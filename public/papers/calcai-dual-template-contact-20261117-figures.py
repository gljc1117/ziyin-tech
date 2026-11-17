"""Rebuild the paper's original figures from its public scalar CSV/JSON only.

Usage: python calcai-dual-template-contact-20261117-figures.py --output-dir figures
Requires Python 3, matplotlib and an installed CJK font (or --font /path/font.ttc).
No patient geometry, identifiers, private paths or model inference are included.
"""
from pathlib import Path
import argparse
import csv
import json
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

SLUG = 'calcai-dual-template-contact-20261117'
INK, TEAL, BLUE, RED, GREY = '#17334b', '#087e82', '#3b68ac', '#bc394b', '#7b8794'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output-dir', type=Path, default=Path('figures'))
    parser.add_argument('--font', type=Path, default=Path('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'))
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    if args.font.exists():
        font_manager.fontManager.addfont(str(args.font))
        family = font_manager.FontProperties(fname=str(args.font)).get_name()
        plt.rcParams['font.family'] = family
    plt.rcParams.update({'svg.fonttype': 'path', 'font.size': 12, 'axes.unicode_minus': False,
                         'axes.spines.top': False, 'axes.spines.right': False,
                         'axes.labelcolor': INK, 'text.color': INK, 'xtick.color': INK,
                         'ytick.color': INK, 'figure.facecolor': 'white', 'savefig.facecolor': 'white'})
    source = Path(__file__).resolve().parent
    with (source / f'{SLUG}-targets.csv').open(encoding='utf-8') as handle:
        rows = list(csv.DictReader(handle))
    data = json.loads((source / f'{SLUG}-summary.json').read_text())

    def save(fig, name):
        fig.savefig(args.output_dir / f'{name}.svg', metadata={'Date': None}, bbox_inches='tight')
        fig.savefig(args.output_dir / f'{name}.png', dpi=150, bbox_inches='tight')
        plt.close(fig)

    fig, ax = plt.subplots(figsize=(12, 8.6))
    ax.set(xlim=(0, 12), ylim=(0, 8.6)); ax.axis('off')
    ax.text(.25, 8.18, 'CALCAI V40  /  研究设计', fontsize=21, weight='bold')
    ax.text(.25, 7.72, '双组模板在候选生成阶段参与约束；既有接纳调整保持不变', fontsize=13)

    def box(x, y, w, h, title, detail, color=BLUE):
        ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle='round,pad=0.12',
                                   facecolor=color, edgecolor='none', alpha=.08))
        ax.text(x+.2, y+h-.12, title, color=color, fontsize=14, weight='bold', va='top')
        ax.text(x+.2, y+.12, detail, fontsize=11.5, va='bottom', linespacing=1.65)

    def arrow(start, end):
        ax.add_patch(FancyArrowPatch(start, end, arrowstyle='-|>', mutation_scale=15, color=GREY, lw=1.4))

    box(.25, 6.12, 11.5, 1.05, '26 个历史病例条目', '7 个符合再生成条件，每例 1 枚目标 PF 骨块；19 个沿用封存基线。全部已有人工参考暴露。')
    arrow((6, 6.0), (6, 5.67))
    box(.25, 4.72, 11.5, .8, '共同起点与保护范围', '相同起始候选；20 项既有调整逐项保留；其他骨块位姿固定。')
    arrow((3, 4.58), (3, 4.25)); arrow((9, 4.58), (9, 4.25))
    box(.25, 2.91, 5.45, 1.2, '对照：单组参与生成', '4 份模板参与生成目标\n局部接触 + 运动预算 + 碰撞约束', BLUE)
    box(6.3, 2.91, 5.45, 1.2, '主方案：双组参与生成', '4 + 4 份互不重叠模板参与生成目标\n局部接触 + 运动预算 + 碰撞约束', TEAL)
    arrow((3, 2.78), (3, 2.45)); arrow((9, 2.78), (9, 2.45))
    box(.25, 1.36, 11.5, .95, '共同接纳规则 → 完整自动批次封存 → 人工参考逐骨块评价', '两组模板均参与最终接纳；当前批次封存前不读取人工误差；不构成独立验证。')
    ax.text(.35, .66, '目标骨块：5 改善  /  1 持平  /  1 退化', color=TEAL, fontsize=16, weight='bold')
    ax.text(8.08, .66, '结论：未通过升版', color=RED, fontsize=16, weight='bold')
    ax.text(.35, .12, 'PF：后关节面相关骨块。图示为工程研究流程，不是临床使用流程。', fontsize=11, color=GREY)
    save(fig, 'fig1-workflow')

    fig, (ax, delta_ax) = plt.subplots(1, 2, figsize=(12, 7.4), gridspec_kw={'width_ratios': [1.6, 1]})
    ys = list(range(len(rows)))
    base = [float(r['v38_p95_mm']) for r in rows]
    single = [float(r['single_panel_p95_mm']) for r in rows]
    dual = [float(r['dual_panel_p95_mm']) for r in rows]
    ds = [float(r['delta_vs_v38_mm']) for r in rows]
    labels = [f"{r['record']}  ·  {r['fragment']}" for r in rows]
    for y, a, b in zip(ys, base, dual):
        ax.plot([a, b], [y, y], color=GREY, lw=1.5, zorder=1)
    ax.scatter(base, ys, s=64, marker='s', color=GREY, label='V38 基线', zorder=3)
    ax.scatter(single, [y+.13 for y in ys], s=75, marker='^', facecolor='white', edgecolor=BLUE, linewidth=1.5, label='单组生成', zorder=4)
    ax.scatter(dual, [y-.13 for y in ys], s=65, color=TEAL, label='双组生成', zorder=5)
    ax.set(yticks=ys, yticklabels=labels, xlabel='对应顶点 P95（mm，越低越好）', xlim=(0, 22), ylim=(6.55, -.65))
    ax.set_title('A  三组逐骨块绝对误差', loc='left', pad=18, fontsize=15, weight='bold')
    ax.grid(axis='x', color='#e4e9ee'); ax.set_axisbelow(True)
    ax.legend(loc='upper center', bbox_to_anchor=(.55, -.14), ncol=3, frameon=False, fontsize=10)
    colors = [TEAL if d < -1e-6 else RED if d > 1e-6 else GREY for d in ds]
    delta_ax.axvline(0, color=INK, lw=1)
    delta_ax.barh(ys, ds, color=colors, height=.48)
    for y, d, c in zip(ys, ds, colors):
        delta_ax.text(d+(.025 if d>=0 else -.025), y, f'{d:+.3f}', va='center', ha='left' if d>=0 else 'right', color=c, weight='bold')
    delta_ax.set(yticks=ys, yticklabels=[], xlabel='双组生成 − V38（mm）', xlim=(-1.4, .52), ylim=(6.55, -.65))
    delta_ax.set_title('B  改变量：保留退化信号', loc='left', pad=18, fontsize=15, weight='bold')
    delta_ax.grid(axis='x', color='#e4e9ee'); delta_ax.set_axisbelow(True)
    fig.suptitle('七枚预先确定的目标骨块', fontsize=21, weight='bold', y=.98)
    fig.text(.07, .015, '平均变化 −0.355 mm，不能抵消 R04 的 +0.222 mm 退化。3 枚目标的残余 P95 仍超过 13 mm。', fontsize=11)
    fig.subplots_adjust(left=.13, right=.98, top=.86, bottom=.19, wspace=.19)
    save(fig, 'fig2-fragment-errors')

    fig = plt.figure(figsize=(12, 8.7))
    gs = fig.add_gridspec(2, 2, height_ratios=[2.5, 1], hspace=.66, wspace=.33)
    ax1, ax2, ax3 = fig.add_subplot(gs[0, 0]), fig.add_subplot(gs[0, 1]), fig.add_subplot(gs[1, :])
    d4, d3 = data['failure_diagnosis']['R04'], data['failure_diagnosis']['R03']
    r4, r3 = rows[3], rows[2]
    vals1 = [float(r4['v38_p95_mm']), float(r4['single_panel_p95_mm']), float(r4['dual_panel_p95_mm'])]
    vals2 = [float(r3['v38_p95_mm']), float(r3['dual_panel_p95_mm']), d3['dual_panel']['posthoc_reference_best_eligible']['target_p95_mm']]
    for axp, vals, labs, colors, limit in [
        (ax1, vals1, ['V38 基线', '单组首选', '双组首选'], [GREY, BLUE, RED], 4.1),
        (ax2, vals2, ['V38 基线', '双组首选', '事后参考最优'], [GREY, TEAL, '#d39925'], 5.5),
    ]:
        axp.bar(range(3), vals, color=colors, width=.58)
        for i, val in enumerate(vals): axp.text(i, val+.065, f'{val:.3f}', ha='center', fontsize=12)
        axp.set(xticks=range(3), xticklabels=labs, ylim=(0, limit), ylabel='对应顶点 P95（mm）')
        axp.grid(axis='y', color='#e4e9ee'); axp.set_axisbelow(True)
    ax1.set_title('A  R04：候选生成仍有偏差', loc='left', fontsize=14, weight='bold', pad=35)
    ax2.set_title('B  R03：自动排序损失', loc='left', fontsize=14, weight='bold', pad=35)
    ax1.text(.5, 1.015, '3 个合格新候选均比基线更差', transform=ax1.transAxes, ha='center', fontsize=11, color=RED)
    ax2.text(.5, 1.015, '差距 0.358 mm；事后最优未替换首选', transform=ax2.transAxes, ha='center', fontsize=11, color='#926300')
    counts = [data['optimizer'][k] for k in ['success', 'iteration_limit', 'directional_derivative_failure']]
    left = 0
    for count, color in zip(counts, [TEAL, '#e2b04b', RED]):
        ax3.barh([0], [count], left=left, color=color, height=.5)
        if count > 1: ax3.text(left+count/2, 0, str(count), ha='center', va='center', weight='bold')
        left += count
    ax3.set(xlim=(0, 54), ylim=(-.8, .8), yticks=[], xlabel='求解调用轮次（合计 54；不是病例数）')
    ax3.set_title('C  优化器状态：成功 4 · 迭代上限 49 · 线搜索失败 1', loc='left', fontsize=14, weight='bold', pad=12)
    fig.suptitle('几何接纳、参考误差与优化收敛需要分别检查', fontsize=20, weight='bold', y=.98)
    fig.text(.1, .018, '合格候选仅指通过既定工程规则。事后参考最优属于失效诊断，不是自动算法结果。', fontsize=11)
    fig.subplots_adjust(left=.09, right=.97, top=.82, bottom=.12)
    save(fig, 'fig3-failure-analysis')


if __name__ == '__main__':
    main()
