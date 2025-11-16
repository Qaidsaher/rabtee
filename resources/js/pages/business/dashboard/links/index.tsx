import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit as editBusiness } from '@/routes/businesses';
import { create, destroy, edit, index } from '@/routes/businesses/links';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';

interface BusinessSummary {
    id: number;
    name: string;
}

interface BusinessLinkResource {
    id: number;
    label: string;
    type: string;
    url: string;
    icon?: string | null;
    sort_order?: number | null;
    is_active: boolean;
}

interface LinkIndexProps {
    business: BusinessSummary;
    links: BusinessLinkResource[];
}

const LINK_TYPE_LABELS: Record<string, string> = {
    whatsapp: 'واتساب',
    call: 'اتصال',
    instagram: 'إنستغرام',
    website: 'موقع ويب',
    location: 'الموقع',
};

const resolveLinkType = (type: string): string => LINK_TYPE_LABELS[type] ?? type;

export default function BusinessLinkIndex({ business, links }: LinkIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'أنشطتي', href: dashboard() },
        { title: business.name, href: editBusiness.url({ business: business.id }) },
        { title: 'الروابط الذكية', href: index.url({ business: business.id }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${business.name} • الروابط`} />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-right">
                        <h1 className="text-2xl font-semibold">الروابط والأزرار</h1>
                        <p className="text-sm text-muted-foreground">
                            نظّم أزرار الاتصال، واتساب، مواقع التواصل، وأي رابط مخصص بسهولة.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create.url({ business: business.id })} prefetch>
                            إضافة رابط
                        </Link>
                    </Button>
                </div>

                <Card className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>العنوان</TableHead>
                                <TableHead>النوع</TableHead>
                                <TableHead>الرابط</TableHead>
                                <TableHead className="w-24 text-center">الحالة</TableHead>
                                <TableHead className="w-32 text-right">الإجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {links.map((link) => (
                                <TableRow key={link.id}>
                                    <TableCell className="font-medium">{link.label}</TableCell>
                                    <TableCell className="text-muted-foreground">{resolveLinkType(link.type)}</TableCell>
                                    <TableCell className="truncate text-sm text-muted-foreground">
                                        {link.url}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span
                                            className={link.is_active ? 'text-emerald-600' : 'text-muted-foreground'}
                                        >
                                            {link.is_active ? 'نشط' : 'مخفي'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href={edit.url({ link: link.id })} prefetch>
                                                    تعديل
                                                </Link>
                                            </Button>
                                            <Form {...destroy.form({ link: link.id })}>
                                                {({ processing, errors }) => (
                                                    <>
                                                        <Button
                                                            type="submit"
                                                            size="sm"
                                                            variant="destructive"
                                                            disabled={processing}
                                                        >
                                                            حذف
                                                        </Button>
                                                        <InputError message={errors.id} />
                                                    </>
                                                )}
                                            </Form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
