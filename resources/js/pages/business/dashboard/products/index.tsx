import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit as editBusiness } from '@/routes/businesses';
import { create, destroy, edit, index } from '@/routes/businesses/products';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';

interface ProductResource {
    id: number;
    name: string;
    description?: string | null;
    price?: number | null;
    currency?: string | null;
    is_active: boolean;
    sort_order?: number | null;
}

interface BusinessSummary {
    id: number;
    name: string;
}

interface ProductIndexProps {
    business: BusinessSummary;
    products: ProductResource[];
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

export default function ProductIndex({ business, products }: ProductIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'أنشطتي', href: dashboard() },
        { title: business.name, href: editBusiness.url({ business: business.id }) },
        { title: 'المنتجات', href: index.url({ business: business.id }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${business.name} • المنتجات`} />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-right">
                        <h1 className="text-2xl font-semibold">القائمة والعروض</h1>
                        <p className="text-sm text-muted-foreground">
                            أبرز خدماتك ومنتجاتك ليراها الجمهور على صفحتك العامة.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create.url({ business: business.id })} prefetch>
                            إضافة منتج
                        </Link>
                    </Button>
                </div>

                <Card className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>الاسم</TableHead>
                                <TableHead>الوصف</TableHead>
                                <TableHead className="w-24 text-right">السعر</TableHead>
                                <TableHead className="w-24 text-center">الحالة</TableHead>
                                <TableHead className="w-32 text-right">الإجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {product.description ?? 'بدون وصف'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatPrice(product.price, product.currency ?? 'YER')}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span
                                            className={product.is_active ? 'text-emerald-600' : 'text-muted-foreground'}
                                        >
                                            {product.is_active ? 'ظاهر' : 'مخفي'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href={edit.url({ product: product.id })} prefetch>
                                                    تعديل
                                                </Link>
                                            </Button>
                                            <Form {...destroy.form({ product: product.id })}>
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
