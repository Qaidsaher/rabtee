import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { create as createBusiness, store, edit as editBusiness, update } from '@/routes/businesses';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

interface ThemeOption {
    id: number;
    name: string;
}

interface BusinessResource {
    id: number;
    name: string;
    slogan?: string | null;
    short_description?: string | null;
    about?: string | null;
    logo_path?: string | null;
    cover_image_path?: string | null;
    business_type?: string | null;
    category?: string | null;
    country?: string | null;
    city?: string | null;
    timezone?: string | null;
    theme_id?: number | null;
    is_active: boolean;
}

interface BusinessFormProps {
    business?: BusinessResource;
    themes: ThemeOption[];
}

export default function BusinessForm({ business, themes }: BusinessFormProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'أنشطتي',
            href: dashboard(),
        },
        {
            title: business ? 'تعديل النشاط' : 'إنشاء نشاط',
            href: business
                ? editBusiness.url({ business: business.id })
                : createBusiness.url(),
        },
    ];

    const isEditing = Boolean(business);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'تعديل النشاط' : 'إنشاء نشاط'} />

            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="text-right">
                            <h1 className="text-2xl font-semibold">
                                {isEditing ? 'تحديث بيانات النشاط' : 'إنشاء صفحة نشاط جديدة'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                صِف نشاطك وروابطه وصوره كما تحب أن يشاهده الزوار.
                            </p>
                        </div>
                    </div>

                    <Form
                        {...(isEditing
                            ? update.form({ business: business?.id })
                            : store.form())}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">اسم النشاط</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            defaultValue={business?.name}
                                            placeholder="مقهى رابطي"
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slogan">شعار قصير</Label>
                                        <Input
                                            id="slogan"
                                            name="slogan"
                                            defaultValue={business?.slogan ?? ''}
                                            placeholder="هوية ذكية تحكي قصتك"
                                        />
                                        <InputError message={errors.slogan} />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="short_description">وصف مختصر</Label>
                                        <Input
                                            id="short_description"
                                            name="short_description"
                                            defaultValue={business?.short_description ?? ''}
                                            placeholder="وصف جذاب يظهر أسفل العنوان"
                                        />
                                        <InputError message={errors.short_description} />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="about">عن النشاط</Label>
                                        <Textarea
                                            id="about"
                                            name="about"
                                            defaultValue={business?.about ?? ''}
                                            rows={5}
                                            placeholder="احكِ قصتك، خدماتك، وأهم ما يميز تجربتك"
                                        />
                                        <InputError message={errors.about} />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="logo_path">رابط الشعار</Label>
                                        <Input
                                            id="logo_path"
                                            name="logo_path"
                                            defaultValue={business?.logo_path ?? ''}
                                            placeholder="https://..."
                                        />
                                        <InputError message={errors.logo_path} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cover_image_path">صورة الغلاف</Label>
                                        <Input
                                            id="cover_image_path"
                                            name="cover_image_path"
                                            defaultValue={business?.cover_image_path ?? ''}
                                            placeholder="https://..."
                                        />
                                        <InputError message={errors.cover_image_path} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="business_type">نوع النشاط</Label>
                                        <Input
                                            id="business_type"
                                            name="business_type"
                                            defaultValue={business?.business_type ?? ''}
                                            placeholder="مطعم، عيادة، علامة شخصية"
                                        />
                                        <InputError message={errors.business_type} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">التصنيف</Label>
                                        <Input
                                            id="category"
                                            name="category"
                                            defaultValue={business?.category ?? ''}
                                            placeholder="قهوة مختصة، تصميم، عيادة"
                                        />
                                        <InputError message={errors.category} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">الدولة</Label>
                                        <Input
                                            id="country"
                                            name="country"
                                            defaultValue={business?.country ?? ''}
                                        />
                                        <InputError message={errors.country} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">المدينة</Label>
                                        <Input id="city" name="city" defaultValue={business?.city ?? ''} />
                                        <InputError message={errors.city} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">المنطقة الزمنية</Label>
                                        <Input
                                            id="timezone"
                                            name="timezone"
                                            defaultValue={business?.timezone ?? ''}
                                            placeholder="Asia/Aden"
                                        />
                                        <InputError message={errors.timezone} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="theme_id">المظهر</Label>
                                        <select
                                            id="theme_id"
                                            name="theme_id"
                                            defaultValue={business?.theme_id ?? ''}
                                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="">المظهر الافتراضي</option>
                                            {themes.map((theme) => (
                                                <option key={theme.id} value={theme.id}>
                                                    {theme.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.theme_id} />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <label className="flex items-center gap-2 text-sm font-medium">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            defaultChecked={business?.is_active ?? true}
                                            className="size-4 rounded border"
                                        />
                                        نشط
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {isEditing ? 'حفظ التعديلات' : 'إنشاء النشاط'}
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
