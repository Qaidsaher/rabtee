import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { click } from '@/routes/public/businesses';
import { Head } from '@inertiajs/react';

interface BusinessLink {
    id: number;
    type: string;
    label: string;
    url: string;
    icon?: string | null;
}

interface Product {
    id: number;
    name: string;
    description?: string | null;
    price?: number | null;
    currency?: string;
}

interface LocationPayload {
    country?: string | null;
    city?: string | null;
    timezone?: string | null;
}

interface ThemePayload {
    colors?: Record<string, string>;
    styles?: Record<string, string>;
    font?: Record<string, string>;
}

interface BusinessPayload {
    name: string;
    slug: string;
    slogan?: string | null;
    short_description?: string | null;
    about?: string | null;
    logo_path?: string | null;
    cover_image_path?: string | null;
    location?: LocationPayload;
    theme?: ThemePayload;
    links: BusinessLink[];
    products: Product[];
}

interface BusinessPageProps {
    businessId: number;
    payload: BusinessPayload;
}

const formatPrice = (price?: number | null, currency: string = 'YER'): string => {
    if (price === null || price === undefined) {
        return 'مجاني';
    }

    return new Intl.NumberFormat('ar', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(price);
};

const LINK_TYPE_LABELS: Record<string, string> = {
    whatsapp: 'واتساب',
    call: 'اتصال',
    instagram: 'إنستغرام',
    website: 'موقع ويب',
    location: 'الموقع',
};

const translateLinkType = (type: string): string => LINK_TYPE_LABELS[type] ?? type;

export default function BusinessPage({ businessId, payload }: BusinessPageProps) {
    const {
        name,
        slogan,
        short_description,
        about,
        logo_path,
        cover_image_path,
        location,
        theme,
        links,
        products,
    } = payload;

    const background = theme?.colors?.background ?? '#0b1221';
    const textColor = theme?.colors?.text ?? '#f8fafc';
    const accent = theme?.colors?.primary ?? '#22d3ee';

    const handleLinkClick = async (link: BusinessLink) => {
        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

        try {
            await fetch(click.url({ business: businessId }), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrf ?? '',
                },
                body: JSON.stringify({
                    type: link.type,
                    business_link_id: link.id,
                }),
                keepalive: true,
            });
        } catch (error) {
            console.error('تعذر تسجيل النقر', error);
        } finally {
            window.open(link.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            className="min-h-screen w-full"
            style={{
                background,
                color: textColor,
                fontFamily: theme?.font?.family ?? 'Cairo',
            }}
            dir="rtl"
        >
            <Head title={`${name} | منصة رابطي`} />

            <div className="relative isolate">
                {cover_image_path && (
                    <div
                        className="absolute inset-0 -z-10 opacity-40"
                        style={{
                            backgroundImage: `url(${cover_image_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(20px)',
                        }}
                    />
                )}

                <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 md:py-16">
                    <header className="flex flex-col items-center gap-4 text-center">
                        {logo_path && (
                            <img
                                src={logo_path}
                                alt={`شعار ${name}`}
                                className={cn(
                                    'size-24 rounded-full border-4 object-cover shadow-2xl',
                                    theme?.styles?.rounded === '2xl' && 'rounded-3xl',
                                )}
                            />
                        )}
                        <div className="space-y-2">
                            {slogan && (
                                <p className="text-sm tracking-[0.25em] text-white/60">
                                    {slogan}
                                </p>
                            )}
                            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                                {name}
                            </h1>
                            {short_description && (
                                <p className="text-lg text-white/70">{short_description}</p>
                            )}
                        </div>
                        {location && (location.city || location.country) && (
                            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
                                {location.city && <Badge variant="outline">{location.city}</Badge>}
                                {location.country && (
                                    <Badge variant="outline">{location.country}</Badge>
                                )}
                                {location.timezone && <span>{location.timezone}</span>}
                            </div>
                        )}
                    </header>

                    {links.length > 0 && (
                        <Card className="bg-white/5 backdrop-blur-xl dark:bg-white/5">
                            <CardHeader>
                                <CardTitle className="text-xl" style={{ color: accent }}>
                                    روابط سريعة
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-3">
                                {links.map((link) => (
                                    <Button
                                        key={link.id}
                                        className="w-full justify-between text-base"
                                        size="lg"
                                        variant="secondary"
                                        style={{
                                            backgroundColor: theme?.colors?.card ?? '#111827',
                                            color: theme?.colors?.button_text ?? '#0f172a',
                                        }}
                                        onClick={() => handleLinkClick(link)}
                                    >
                                        <span>{link.label}</span>
                                        <span className="text-xs tracking-wide text-white/70">
                                            {translateLinkType(link.type)}
                                        </span>
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {products.length > 0 && (
                        <Card className="bg-white/5 backdrop-blur-xl dark:bg-white/5">
                            <CardHeader>
                                <CardTitle className="text-xl" style={{ color: accent }}>
                                    قائمة مختارة
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {products.map((product) => (
                                    <div key={product.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-medium">{product.name}</p>
                                            <p className="text-base text-white/80">
                                                {formatPrice(product.price, product.currency)}
                                            </p>
                                        </div>
                                        {product.description && (
                                            <p className="text-sm text-white/70">{product.description}</p>
                                        )}
                                        <Separator className="bg-white/10" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {about && (
                        <Card className="bg-white/5 backdrop-blur-xl dark:bg-white/5">
                            <CardHeader>
                                <CardTitle className="text-xl" style={{ color: accent }}>
                                    قصتنا
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base leading-relaxed text-white/80">{about}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
