import Image from 'next/image';

interface AuthorBioProps {
    className?: string;
}

export default function AuthorBio({ className = '' }: AuthorBioProps) {
    return (
        <div className={`author-bio ${className}`}>
            <div className="author-bio-avatar">
                <Image
                    src="/images/profile.jpg"
                    alt="本山貴大"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="author-bio-content">
                <div className="author-bio-name">本山貴大 / Takahiro Motoyama</div>
                <p className="author-bio-description">
                    バリ在住のライフコーチ・AI活用アドバイザー。自分らしい生き方と働き方を探求し、コーチングとテクノロジーを通じて人々の可能性を広げるサポートをしています。
                </p>
            </div>
        </div>
    );
}
