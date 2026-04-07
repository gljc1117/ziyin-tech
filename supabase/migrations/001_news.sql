-- 新闻动态表
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text,
  content text,
  cover_url text,
  category text DEFAULT '公司动态',
  is_published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "已发布新闻可读" ON news FOR SELECT USING (is_published = true);

INSERT INTO news (title, summary, category, published_at) VALUES
('子殷科技完成数字骨科平台核心模块开发', '盘古AI三维重建系统完成CT/MRI DICOM数据自动分割与亚毫米级三维重建能力验证，标志着平台核心技术栈正式贯通。', '技术进展', '2026-03-15'),
('与内蒙古医科大学附属医院达成临床合作', '双方将在骨科3D打印手术导板、个性化植入物等领域开展深度合作，首批临床验证案例已启动。', '合作动态', '2026-03-01'),
('子殷科技官网正式上线', '全新官网 www.chcomct.cn 正式发布，展示数字骨科智能手术规划平台核心能力与临床案例。', '公司动态', '2026-02-20');
