import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { create as createBusiness, edit as editBusiness } from '@/routes/businesses';
import { show as analyticsShow } from '@/routes/businesses/analytics';
import { show as publicShow } from '@/routes/public/businesses';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardBusiness {
    id: number;
    name: string;
    slug: string;
    short_description?: string | null;
    is_active: boolean;
    theme?: { id: number; name: string } | null;
    visits_count: number;
    clicks_count: number;
}

interface DashboardProps {
    businesses: DashboardBusiness[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'أنشطتي',
        href: dashboard(),
    },
];

export default function BusinessDashboardIndex({ businesses }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="صفحات الأعمال" />
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-right">
                        <h1 className="text-2xl font-semibold tracking-tight">صفحاتك الذكية</h1>
                        <p className="text-sm text-muted-foreground">
                            تحكم في البيانات، المنتجات، والروابط من مكان واحد بسرعة فائقة.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={createBusiness.url()} prefetch>
                            إنشاء نشاط جديد
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {businesses.map((business) => (
                        <Card key={business.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <span>{business.name}</span>
                                    <Badge variant={business.is_active ? 'default' : 'destructive'}>
                                        {business.is_active ? 'نشط' : 'متوقف'}
                                    </Badge>
                                </CardTitle>
                                {business.short_description && (
                                    <p className="text-sm text-muted-foreground">
                                        {business.short_description}
                                    </p>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span>{business.visits_count} زيارة</span>
                                    <span className="text-muted-foreground/50">•</span>
                                    <span>{business.clicks_count} نقرة</span>
                                    {business.theme?.name && (
                                        <>
                                            <span className="text-muted-foreground/50">•</span>
                                            <span>المظهر: {business.theme.name}</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button asChild variant="secondary">
                                        <Link href={editBusiness.url({ business: business.id })} prefetch>
                                            تعديل الصفحة
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Link href={analyticsShow.url({ business: business.id })} prefetch>
                                            عرض التحليلات
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <a
                                            href={publicShow.url({ slug: business.slug })}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            فتح الصفحة العامة
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
