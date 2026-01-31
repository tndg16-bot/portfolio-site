#!/usr/bin/env python3
"""
ブログ記事統合スクリプト
既存104記事 → 001-104
新規001-080 → 105-184
新規081-160 → 185-264
残り → 265-320
"""

import os
import re
import shutil
from pathlib import Path

def extract_date_from_file(filepath):
    """ファイルから日付を抽出"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # date: "YYYY-MM-DD" または date: 'YYYY-MM-DD' を検索
            match = re.search(r'date:\s*["\']([^"\']+)["\']', content)
            if match:
                return match.group(1)
    except:
        pass
    return "9999-99-99"  # 日付がない場合は最後に

def extract_slug_from_filename(filename):
    """ファイル名からスラッグを抽出 (数字-を除去)"""
    # 001-filename.md → filename
    match = re.match(r'^\d+-(.*)\.md$', filename)
    if match:
        return match.group(1)
    return filename.replace('.md', '')

def main():
    blog_dir = Path('content/blog')
    backup_dir = Path('.backup/blog-original')
    temp_dir = Path('.temp_reorganize')
    
    # クリーンアップ
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir(parents=True)
    
    # すべてのファイルを一時フォルダにコピー
    print("=== ファイルを収集中 ===")
    all_files = []
    for f in blog_dir.glob('*.md'):
        date = extract_date_from_file(f)
        all_files.append((date, f.name))
        shutil.copy(f, temp_dir / f.name)
    
    # 日付でソート（古い順）
    all_files.sort(key=lambda x: x[0])
    print(f"合計 {len(all_files)} ファイル")
    
    # 既存104記事（最も古い日付）を特定
    existing_files = all_files[:104]
    new_files = all_files[104:]
    
    print(f"\n既存記事: {len(existing_files)} ファイル")
    print(f"新規記事: {len(new_files)} ファイル")
    
    # blogディレクトリをクリア
    for f in blog_dir.glob('*.md'):
        f.unlink()
    
    # Step 1: 既存104記事 → 001-104
    print("\n=== 既存記事を001-104に配置 ===")
    for idx, (date, filename) in enumerate(existing_files, 1):
        new_num = f"{idx:03d}"
        slug = extract_slug_from_filename(filename)
        new_name = f"{new_num}-{slug}.md"
        shutil.copy(temp_dir / filename, blog_dir / new_name)
        print(f"{filename} -> {new_name}")
    
    # Step 2: 新規記事を分類して配置
    print("\n=== 新規記事を配置 ===")
    
    # ファイル番号で分類
    batch_105_184 = []  # 元001-080 → 105-184
    batch_185_264 = []  # 元081-160 → 185-264
    batch_265_plus = []  # その他 → 265+
    
    for date, filename in new_files:
        # ファイル名から元の番号を抽出
        match = re.match(r'^(\d+)-', filename)
        if match:
            orig_num = int(match.group(1))
            if 1 <= orig_num <= 80:
                batch_105_184.append((orig_num, filename))
            elif 81 <= orig_num <= 160:
                batch_185_264.append((orig_num, filename))
            else:
                batch_265_plus.append((orig_num, filename))
        else:
            batch_265_plus.append((999, filename))
    
    # 105-184に配置 (80ファイル)
    print(f"\n105-184バッチ: {len(batch_105_184)} ファイル")
    for orig_num, filename in sorted(batch_105_184):
        new_num = 104 + orig_num  # 105-184
        new_num_str = f"{new_num:03d}"
        slug = extract_slug_from_filename(filename)
        new_name = f"{new_num_str}-{slug}.md"
        shutil.copy(temp_dir / filename, blog_dir / new_name)
        print(f"{filename} -> {new_name}")
    
    # 185-264に配置 (80ファイル)
    print(f"\n185-264バッチ: {len(batch_185_264)} ファイル")
    for orig_num, filename in sorted(batch_185_264):
        new_num = 184 + (orig_num - 80)  # 185-264
        new_num_str = f"{new_num:03d}"
        slug = extract_slug_from_filename(filename)
        new_name = f"{new_num_str}-{slug}.md"
        shutil.copy(temp_dir / filename, blog_dir / new_name)
        print(f"{filename} -> {new_name}")
    
    # 265-320に配置 (残り)
    print(f"\n265-320バッチ: {len(batch_265_plus)} ファイル")
    start_num = 265
    for _, filename in sorted(batch_265_plus):
        new_num_str = f"{start_num:03d}"
        slug = extract_slug_from_filename(filename)
        new_name = f"{new_num_str}-{slug}.md"
        shutil.copy(temp_dir / filename, blog_dir / new_name)
        print(f"{filename} -> {new_name}")
        start_num += 1
    
    # クリーンアップ
    shutil.rmtree(temp_dir)
    
    # 結果表示
    final_count = len(list(blog_dir.glob('*.md')))
    print(f"\n=== 統合完了 ===")
    print(f"最終ファイル数: {final_count}")
    print("\nファイル一覧（先頭20件）:")
    for f in sorted(blog_dir.glob('*.md'))[:20]:
        print(f"  {f.name}")

if __name__ == '__main__':
    main()
