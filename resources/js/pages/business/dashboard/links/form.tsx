import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit as editBusiness } from '@/routes/businesses';
import { create, store, update, index } from '@/routes/businesses/links';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

interface BusinessSummary {
    id: number;
    name: string;
}

interface LinkResource {
    id: number;
    label: string;
    type: string;
    url: string;
    icon?: string | null;
    sort_order?: number | null;
    is_active: boolean;
}

interface LinkFormProps {
    business: BusinessSummary;
    link?: LinkResource;
}

export default function LinkForm({ business, link }: LinkFormProps) {
    const isEditing = Boolean(link);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'أنشطتي', href: dashboard() },
        { title: business.name, href: editBusiness.url({ business: business.id }) },
        { title: 'الروابط الذكية', href: index.url({ business: business.id }) },
        {
            title: isEditing ? 'تعديل رابط' : 'إنشاء رابط',
            href: isEditing
                ? update.url({ link: link?.id })
                : create.url({ business: business.id }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${business.name} • ${isEditing ? 'تعديل رابط' : 'رابط جديد'}`} />

            <div className="mx-auto max-w-3xl">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="mb-6 text-right">
                        <h1 className="text-2xl font-semibold">
                            {isEditing ? 'تحديث بيانات الرابط' : 'إضافة رابط جديد'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            يساعد تحديد النوع على تنظيم التحليلات وتتبّع النقرات لكل قناة.
                        </p>
                    </div>

                    <Form
                        {...(isEditing
                            ? update.form({ link: link?.id })
                            : store.form({ business: business.id }))}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="label">عنوان الزر</Label>
                                        <Input
                                            id="label"
                                            name="label"
                                            defaultValue={link?.label}
                                            placeholder="واتساب"
                                            required
                                        />
                                        <InputError message={errors.label} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">النوع</Label>
                                        <Input
                                            id="type"
                                            name="type"
                                            defaultValue={link?.type ?? 'whatsapp'}
                                            placeholder="مثال: whatsapp, call, instagram"
                                            required
                                        />
                                        <InputError message={errors.type} />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="url">الرابط النهائي</Label>
                                        <Input
                                            id="url"
                                            name="url"
                                            defaultValue={link?.url}
                                            placeholder="https://wa.me/..."
                                            required
                                        />
                                        <InputError message={errors.url} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="icon">الأيقونة</Label>
                                        <Input
                                            id="icon"
                                            name="icon"
                                            defaultValue={link?.icon ?? ''}
                                            placeholder="مثال: whatsapp"
                                        />
                                        <InputError message={errors.icon} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order">ترتيب العرض</Label>
                                        <Input
                                            id="sort_order"
                                            name="sort_order"
                                            type="number"
                                            defaultValue={link?.sort_order ?? 0}
                                        />
                                        <InputError message={errors.sort_order} />
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 text-sm font-medium">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        defaultChecked={link?.is_active ?? true}
                                        className="size-4 rounded border"
                                    />
                                    نشط
                                </label>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {isEditing ? 'حفظ الرابط' : 'إنشاء الرابط'}
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
