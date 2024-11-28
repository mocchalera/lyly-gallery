import { GetStaticProps } from 'next';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Costume } from '@/types/costume';
import { getCostumes } from '@/lib/sheets';
import Layout from '@/components/Layout';

interface Props {
  costumes: Costume[];
}

type SortOption = 'default' | 'name' | 'size';
type SortOrder = 'asc' | 'desc';

export default function Home({ costumes: initialCostumes }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [costumes] = useState<Costume[]>(initialCostumes);

  const categories = ['all', ...new Set(costumes.map(c => c.category))];

  const filteredAndSortedCostumes = useMemo(() => {
    let result = [...costumes];

    // カテゴリーフィルター
    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory);
    }

    // 検索フィルター
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
    }

    // ソート
    if (sortOption !== 'default') {
      result.sort((a, b) => {
        let comparison = 0;
        if (sortOption === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortOption === 'size') {
          const sizeOrder = { 'S': 1, 'M': 2, 'L': 3 };
          comparison = (sizeOrder[a.size as keyof typeof sizeOrder] || 0) - 
                      (sizeOrder[b.size as keyof typeof sizeOrder] || 0);
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [costumes, selectedCategory, sortOption, sortOrder, searchQuery]);

  return (
    <Layout>
      {/* ヒーローセクション */}
      <div className="relative h-[30vh] bg-sage/10">
        <div className="absolute inset-0 bg-gradient-to-b from-sage/20 to-gray-50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
              Costume Gallery
            </h1>
            <p className="text-lg font-serif text-gray-600 mb-4">
              LyLyの衣装コレクション
            </p>
            <p className="max-w-2xl text-sm text-gray-600 leading-relaxed">
              上質な素材と丁寧な仕立てにこだわった衣装の数々。
              お客様の大切な一日を彩る特別な一着をお選びください。
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* フィルターとソートセクション */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 検索ボックス */}
            <div className="relative">
              <input
                type="text"
                placeholder="衣装を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-sage rounded-md bg-white font-serif text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              />
            </div>

            {/* カテゴリー選択 */}
            <div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-sage rounded-md bg-white font-serif text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'すべての衣装' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* ソートオプション */}
            <div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full px-4 py-2 border border-sage rounded-md bg-white font-serif text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              >
                <option value="default">並び順</option>
                <option value="name">名前順</option>
                <option value="size">サイズ順</option>
              </select>
            </div>

            {/* 昇順/降順 */}
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="w-full px-4 py-2 border border-sage rounded-md bg-white font-serif text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              >
                <option value="asc">昇順</option>
                <option value="desc">降順</option>
              </select>
            </div>
          </div>
        </div>

        {/* 検索結果カウント */}
        <div className="mb-8 text-center">
          <p className="font-serif text-gray-600">
            {filteredAndSortedCostumes.length}点の衣装が見つかりました
          </p>
        </div>

        {/* 衣装グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedCostumes.map(costume => (
            <Link 
              key={costume.id} 
              href={`/costumes/${costume.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="relative aspect-[4/3]">
                {costume.imageUrl ? (
                  <Image 
                    src={costume.imageUrl}
                    alt={costume.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 font-serif">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-serif text-gray-800 mb-2 group-hover:text-sage transition-colors">
                  {costume.name || 'No Title'}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {costume.description || '説明なし'}
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 font-serif">
                    サイズ: {costume.size || '-'} / 色: {costume.color || '-'}
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-serif ${
                      costume.available 
                        ? 'bg-sage/10 text-sage' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {costume.available ? '利用可能' : '利用不可'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 検索結果が0の場合 */}
        {filteredAndSortedCostumes.length === 0 && (
          <div className="text-center py-12">
            <p className="font-serif text-gray-600">
              条件に一致する衣装が見つかりませんでした
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const costumes = await getCostumes();
  
  return {
    props: {
      costumes,
    },
    revalidate: 60,
  };
}; 