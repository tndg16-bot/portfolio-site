import os
import re
from pathlib import Path
import json

# Frontmatterパターン（YAML形式）
frontmatter_pattern = re.compile(r'^---\n(.*?)\n---', re.DOTALL)

def parse_frontmatter(content):
    """Markdownファイルのfrontmatterを解析"""
    match = frontmatter_pattern.match(content)
    if not match:
        return None

    frontmatter_text = match.group(1)
    result = {}

    for line in frontmatter_text.split('\n'):
        line = line.strip()
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            # リスト形式のタグを解析
            if key == 'tags' and value.startswith('['):
                # ['tag1', 'tag2'] 形式
                value = value.strip('[]').replace('"', '').replace("'", '').split(',')
                value = [tag.strip() for tag in value if tag.strip()]
            elif key == 'tags' and value.startswith('-'):
                # YAMLリスト形式（複数行）
                continue  # 複数行タグは後で処理

            result[key] = value

    return result

def collect_blog_metadata(blog_dir='content/blog'):
    """全ブログ記事のメタデータを収集"""
    metadata = []

    for file_path in sorted(Path(blog_dir).glob('*.md')):
        # テンプレートファイルや特殊ファイルを除外
        if file_path.name.startswith('.'):
            continue
        # テンプレートファイルを除外（--を含むファイル名や、slugが空のファイル）
        if '--' in file_path.name or '-.md' in file_path.name:
            continue
        # 4桁以上の数字から始まるファイル（テンプレート自動生成）を除外
        if re.match(r'^\d{4,}', file_path.name):
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            frontmatter = parse_frontmatter(content)
            if frontmatter:
                # タイトルが空や、slugが空の場合はテンプレートとして除外
                title = frontmatter.get('title', '').strip()
                slug = frontmatter.get('slug', '').strip()

                if not title or not slug:
                    continue

                metadata.append({
                    'filename': file_path.name,
                    'title': title,
                    'category': frontmatter.get('category', ''),
                    'tags': frontmatter.get('tags', []),
                    'date': frontmatter.get('date', ''),
                    'slug': slug,
                    'published': frontmatter.get('published', 'true')
                })
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    return metadata

def analyze_categories(metadata):
    """カテゴリの分布を分析"""
    category_count = {}
    english_categories = []

    # 日本語カテゴリのリスト（これらを除外）
    japanese_categories = ['コーチング', 'キャリア', '生産性', '思考法', 'マインドセット',
                          'メンタルモデル', 'AI活用', 'リーダーシップ', '自己啓発', 'ビジネス',
                          '学習法', 'コミュニケーション', 'ライフハック', '心理学', '習慣化',
                          '目標設定', '時間管理', '意思決定', 'クリエイティブ', 'ウェルビーイング']

    for item in metadata:
        category = item['category']
        if category:
            category_count[category] = category_count.get(category, 0) + 1

            # 日本語カテゴリではないものを英語カテゴリとして検出
            if category not in japanese_categories:
                english_categories.append({
                    'filename': item['filename'],
                    'title': item['title'],
                    'category': category
                })

    return {
        'category_count': category_count,
        'english_categories': english_categories
    }

if __name__ == '__main__':
    print("ブログ記事のメタデータを収集中...")

    metadata = collect_blog_metadata()
    analysis = analyze_categories(metadata)

    print(f"\n[OK] 記事総数: {len(metadata)}件")
    print(f"\nカテゴリ分布:")
    for cat, count in sorted(analysis['category_count'].items(), key=lambda x: x[1], reverse=True):
        print(f"  - {cat}: {count}件")

    print(f"\n英語カテゴリの記事: {len(analysis['english_categories'])}件")
    for item in analysis['english_categories']:
        print(f"  - {item['filename']}: {item['category']}")

    # 結果をJSONファイルに出力
    output_dir = Path('.sisyphus/reports')
    output_dir.mkdir(parents=True, exist_ok=True)

    with open(output_dir / 'blog_metadata_analysis.json', 'w', encoding='utf-8') as f:
        json.dump({
            'metadata': metadata,
            'analysis': analysis
        }, f, ensure_ascii=False, indent=2)

    print(f"\n[OK] 結果を .sisyphus/reports/blog_metadata_analysis.json に出力しました")
