#!/bin/bash
# ブログ記事統合スクリプト
# 既存104記事 → 001-104
# 新規001-080 → 105-184  
# 新規081-160 → 185-264
# 残り → 265-320

cd content/blog

# Step 1: すべてのファイルを一時フォルダに移動
mkdir -p ../temp_all
cp *.md ../temp_all/

# Step 2: ファイルを日付でソートして種類を分類
cd ../temp_all

# 日付を抽出してソート（古い順）
for f in *.md; do
    date=$(grep "^date:" "$f" 2>/dev/null | head -1 | sed 's/date: //' | sed 's/"//g' | sed "s/'//g")
    echo "$date|$f"
done | sort > ../file_dates_sorted.txt

cd ..

# Step 3: 既存104記事（最も古い日付の104ファイル）を特定
head -104 file_dates_sorted.txt | cut -d'|' -f2 > existing_files.txt

# Step 4: 既存ファイルを001-104にリネーム
counter=1
while IFS= read -r file; do
    if [ -f "temp_all/$file" ]; then
        # 新しいファイル名を生成（3桁連番）
        newnum=$(printf "%03d" $counter)
        # 元のslugを抽出
        slug=$(echo "$file" | sed 's/^[0-9]*-//' | sed 's/\.md$//')
        newname="${newnum}-${slug}.md"
        
        cp "temp_all/$file" "blog/$newname"
        echo "Renamed: $file -> $newname"
        
        counter=$((counter + 1))
    fi
done < existing_files.txt

# Step 5: 新規001-080を105-184にリネーム  
#（既存ファイルリストにない001-080のファイル）
cd temp_all
for f in [0-9][0-9][0-9]-*.md; do
    num=$(echo "$f" | cut -d'-' -f1)
    # 001-080の範囲かつ既存リストにない場合
    if [ "$num" -ge 1 ] && [ "$num" -le 80 ] 2>/dev/null; then
        if ! grep -q "$f" ../existing_files.txt; then
            # 104をベースに新しい番号を計算
            newnum=$(printf "%03d" $((104 + num)))
            slug=$(echo "$f" | sed 's/^[0-9]*-//' | sed 's/\.md$//')
            newname="${newnum}-${slug}.md"
            cp "$f" "../blog/$newname"
            echo "Renamed new: $f -> $newname"
        fi
    fi
done

# Step 6: 新規081-160を185-264にリネーム
for f in [0-9][0-9][0-9]-*.md; do
    num=$(echo "$f" | cut -d'-' -f1)
    # 081-160の範囲かつ既存リストにない場合
    if [ "$num" -ge 81 ] && [ "$num" -le 160 ] 2>/dev/null; then
        if ! grep -q "$f" ../existing_files.txt; then
            # 184をベースに新しい番号を計算 (185-264)
            offset=$((num - 81))
            newnum=$(printf "%03d" $((185 + offset)))
            slug=$(echo "$f" | sed 's/^[0-9]*-//' | sed 's/\.md$//')
            newname="${newnum}-${slug}.md"
            cp "$f" "../blog/$newname"
            echo "Renamed new: $f -> $newname"
        fi
    fi
done

cd ..

# 結果確認
echo ""
echo "=== 統合完了 ==="
echo "blogフォルダ内ファイル数: $(ls blog/*.md 2>/dev/null | wc -l)"
echo ""
echo "ファイル一覧（先頭20件）:"
ls -1 blog/*.md | head -20

# クリーンアップ
rm -rf temp_all file_dates_sorted.txt existing_files.txt
