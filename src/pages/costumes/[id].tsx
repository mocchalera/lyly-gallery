import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Costume } from '@/types/costume';
import { getCostumes } from '@/lib/sheets';

interface Props {
  costume: Costume;
}

export default function CostumeDetail({ costume }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sage hover:text-sage-dark mb-8 font-serif transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          一覧に戻る
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 画像セクション */}
            <div className="relative aspect-square lg:aspect-auto">
              {costume.imageUrl ? (
                <Image
                  src={costume.imageUrl}
                  alt={costume.name}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  className="lg:h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 font-serif">No Image</span>
                </div>
              )}
            </div>

            {/* 詳細情報セクション */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-serif text-gray-800 mb-2">
                  {costume.name}
                </h1>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-serif mb-4 ${
                  costume.available 
                    ? 'bg-sage/10 text-sage' 
                    : 'bg-red-50 text-red-600'
                }`}>
                  {costume.available ? '利用可能' : '利用不可'}
                </span>
                <p className="text-gray-600 leading-relaxed">
                  {costume.description}
                </p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 font-serif text-gray-500">カテゴリー</div>
                  <div className="col-span-2 font-serif">{costume.category}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 font-serif text-gray-500">サイズ</div>
                  <div className="col-span-2 font-serif">{costume.size}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 font-serif text-gray-500">色</div>
                  <div className="col-span-2 font-serif">{costume.color}</div>
                </div>
              </div>

              <div className="mt-8">
                <Link 
                  href="https://docs.google.com/forms/d/xxx" 
                  target="_blank"
                  className="inline-block bg-sage text-white px-8 py-3 rounded-md font-serif hover:bg-sage-dark transition-colors"
                >
                  予約・お問い合わせ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const costumes = await getCostumes();
  
  const paths = costumes.map((costume) => ({
    params: { id: costume.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const costumes = await getCostumes();
  const costume = costumes.find((c) => c.id.toString() === params?.id);

  if (!costume) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      costume,
    },
    revalidate: 60,
  };
}; 