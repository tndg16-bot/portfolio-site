#!/usr/bin/env python3
"""
重複ファイルを解消し、欠番を埋めるスクリプト
"""

import os
import re
from pathlib import Path

def extract_number(filename):
    """ファイル名から番号を抽出"""
    match = re.match(r'^(\d+)-', filename)
    if match:
        return int(match.group(1))
    return None

def main():
    blog_dir = Path('content/blog')
    
    # すべてのファイルを取得
    all_files = list(blog_dir.glob('*.md'))
    print(f"総ファイル数: {len(all_files)}")
    
    # 番号ごとにグループ化
    files_by_number = {}
    for f in all_files:
        num = extract_number(f.name)
        if num:
            if num not in files_by_number:
                files_by_number[num] = []
            files_by_number[num].append(f)
    
    # 重複を確認
    duplicates = {k: v for k, v in files_by_number.items() if len(v) > 1}
    print(f"重複のある番号: {len(duplicates)} 個")
    
    # 欠番を特定
    all_numbers = sorted(files_by_number.keys())
    missing_numbers = []
    for i in range(1, 321):
        if i not in files_by_number:
            missing_numbers.append(i)
    
    print(f"欠番: {len(missing_numbers)} 個")
    print(f"欠番一覧（最初の10個）: {missing_numbers[:10]}")
    
    # 重複ファイルを欠番に移動
    duplicates_to_move = []
    for num, files in duplicates.items():
        # 最初のファイルはそのまま、残りは移動対象
        for f in files[1:]:
            duplicates_to_move.append(f)
    
    print(f"\n移動が必要な重複ファイル: {len(duplicates_to_move)} 個")
    
    # 欠番にリネーム
    for i, file in enumerate(duplicates_to_move):
        if i < len(missing_numbers):
            new_num = missing_numbers[i]
            new_num_str = f"{new_num:03d}"
            
            # スラッグを抽出
            old_name = file.name
            slug = re.sub(r'^\d+-', '', old_name).replace('.md', '')
            new_name = f"{new_num_str}-{slug}.md"
            
            # ファイルの日付を新しい番号に合わせて更新
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 日付を計算（2026-01-01 + new_num - 1日）
            from datetime import datetime, timedelta
            base_date = datetime(2026, 1, 1)
            new_date = base_date + timedelta(days=new_num - 1)
            date_str = new_date.strftime('%Y-%m-%d')
            
            # 日付を更新
            content = re.sub(r"date: ['\"]\d{4}-\d{2}-\d{2}['\"]", f"date: '{date_str}'", content)
            
            # 新しいファイル名で保存
            new_path = blog_dir / new_name
            with open(new_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            # 元のファイルを削除
            file.unlink()
            
            print(f"Moved: {old_name} -> {new_name} (date: {date_str})")
    
    # 最終確認
    final_files = list(blog_dir.glob('*.md'))
    final_numbers = [extract_number(f.name) for f in final_files if extract_number(f.name)]
    
    print(f"\n=== 最終結果 ===")
    print(f"総ファイル数: {len(final_files)}")
    print(f"重複のある番号: {len([n for n in set(final_numbers) if final_numbers.count(n) > 1])}")
    
    # 欠番を再確認
    missing_final = [i for i in range(1, 321) if i not in final_numbers]
    print(f"欠番: {len(missing_final)} 個")
    if missing_final:
        print(f"欠番一覧: {missing_final}")

if __name__ == '__main__':
    main()
