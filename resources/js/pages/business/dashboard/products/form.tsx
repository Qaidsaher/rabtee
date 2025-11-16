import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit as editBusiness } from '@/routes/businesses';
import { create, store, update, index } from '@/routes/businesses/products';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

interface BusinessSummary {
    id: number;
    name: string;
}

interface ProductResource {
    id: number;
    name: string;
    description?: string | null;
    price?: number | null;
    currency?: string | null;
    is_active: boolean;
    sort_order?: number | null;
}

interface ProductFormProps {
    business: BusinessSummary;
    product?: ProductResource;
}

export default function ProductForm({ business, product }: ProductFormProps) {
    const isEditing = Boolean(product);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'أنشطتي', href: dashboard() },
        { title: business.name, href: editBusiness.url({ business: business.id }) },
        {
            title: 'المنتجات',
            href: index.url({ business: business.id }),
        },
        {
            title: isEditing ? 'تعديل منتج' : 'إنشاء منتج',
            href: isEditing
                ? update.url({ product: product?.id })
                : create.url({ business: business.id }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${business.name} • ${isEditing ? 'تعديل منتج' : 'منتج جديد'}`} />

            <div className="mx-auto max-w-3xl">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="mb-6 text-right">
                        <h1 className="text-2xl font-semibold">
                            {isEditing ? 'تحديث بيانات المنتج' : 'إضافة منتج جديد'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            أي تعديل يتم نشره فوراً على الصفحة العامة لتبقى محدّثة.
                        </p>
                    </div>

                    <Form
                        {...(isEditing
                            ? update.form({ product: product?.id })
                            : store.form({ business: business.id }))}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">اسم المنتج</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            defaultValue={product?.name}
                                            placeholder="مشروب توقيع رابطي"
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="price">السعر</Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            inputMode="numeric"
                                            defaultValue={product?.price ?? ''}
                                            placeholder="2000"
                                        />
                                        <InputError message={errors.price} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">العملة</Label>
                                        <Input
                                            id="currency"
                                            name="currency"
                                            defaultValue={product?.currency ?? 'YER'}
                                        />
                                        <InputError message={errors.currency} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order">ترتيب العرض</Label>
                                        <Input
                                            id="sort_order"
                                            name="sort_order"
                                            type="number"
                                            defaultValue={product?.sort_order ?? 0}
                                        />
                                        <InputError message={errors.sort_order} />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="description">الوصف</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            rows={4}
                                            defaultValue={product?.description ?? ''}
                                            placeholder="أضف تفاصيل، مكونات، أو تعليمات الطلب"
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 text-sm font-medium">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        defaultChecked={product?.is_active ?? true}
                                        className="size-4 rounded border"
                                    />
                                    نشط
                                </label>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {isEditing ? 'حفظ المنتج' : 'إنشاء المنتج'}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
