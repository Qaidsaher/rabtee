import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit as editBusiness } from '@/routes/businesses';
import { show as analyticsShow } from '@/routes/businesses/analytics';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface BusinessSummary {
    id: number;
    name: string;
}

interface VisitSummary {
    total: number;
    lastSevenDays: number;
    series: { day: string; total: number }[];
}

interface ClickSummary {
    total: number;
    byType: { type: string | null; total: number }[];
}

interface AnalyticsProps {
    business: BusinessSummary;
    visitSummary: VisitSummary;
    clickSummary: ClickSummary;
}

export default function AnalyticsShow({ business, visitSummary, clickSummary }: AnalyticsProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'أنشطتي', href: dashboard() },
        { title: business.name, href: editBusiness.url({ business: business.id }) },
        { title: 'التحليلات', href: analyticsShow.url({ business: business.id }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${business.name} • التحليلات`} />

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>ملخص الزيارات</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-3">
                            <div>
                                <p className="text-sm text-muted-foreground">إجمالي الزيارات</p>
                                <p className="text-3xl font-semibold">{visitSummary.total}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">آخر ٧ أيام</p>
                                <p className="text-3xl font-semibold">{visitSummary.lastSevenDays}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">عدد الأيام المرصودة</p>
                                <p className="text-3xl font-semibold">{visitSummary.series.length}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>الزيارات اليومية</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {visitSummary.series.length === 0 ? (
                                <p className="text-sm text-muted-foreground">لا توجد زيارات مسجلة بعد.</p>
                            ) : (
                                visitSummary.series.map((entry) => (
                                    <div key={entry.day} className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            {new Date(entry.day).toLocaleDateString('ar-EG')}
                                        </span>
                                        <span className="text-base font-medium">{entry.total}</span>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>النقرات</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <p className="text-sm text-muted-foreground">إجمالي النقرات المسجلة</p>
                                <p className="text-3xl font-semibold">{clickSummary.total}</p>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>نوع الإجراء</TableHead>
                                        <TableHead className="text-right">عدد النقرات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clickSummary.byType.map((entry) => (
                                        <TableRow key={entry.type ?? 'unknown'}>
                                            <TableCell className="font-medium">
                                                {entry.type ?? 'أخرى'}
                                            </TableCell>
                                            <TableCell className="text-right">{entry.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
