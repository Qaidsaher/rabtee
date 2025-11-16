import { MarketingLayout } from '@/components/marketing/marketing-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { ArrowRight, Boxes, Layers, RefreshCw, Shield, Target } from 'lucide-react';

const phases = [
    {
        title: 'إعداد الملف التعريفي',
        details: 'نجمع المعلومات الأساسية: الاسم، الشعار، الوصف، والموقع الجغرافي مع دعم كامل للغة العربية.',
        icon: Target,
    },
    {
        title: 'إدارة المحتوى',
        details: 'واجهة موحدة لإضافة الروابط، المنتجات، القوائم، والأزرار مع ترتيب مرن وسحب وإفلات.',
        icon: Boxes,
    },
    {
        title: 'التحسين والسرعة',
        details: 'ننشئ payload عام، نؤرشفه، ونرسله إلى الواجهة العامة لضمان تحميل فوري.',
        icon: RefreshCw,
    },
    {
        title: 'الرصد والتحليلات',
        details: 'نراقب الزيارات والنقرات عبر وظائف طوابير، ونقدم لوحات تحكم مباشرة.',
        icon: Shield,
    },
];

const automation = [
    'مزامنة تلقائية للثيمات عند تغيير الألوان أو الخطوط.',
    'استدعاء خدمة payload عند أي تعديل لضمان اتساق البيانات.',
    'جدولة وظائف التسجيل لتقليل الحمل على الطلبات العامة.',
];

export default function HowItWorks() {
    return (
        <>
            <Head title="كيف تعمل رابطي" />
            <MarketingLayout>
                <section className="space-y-4 text-right">
                    <Badge className="bg-cyan-400/20 text-cyan-200">رحلة العمل</Badge>
                    <h1 className="text-4xl font-bold text-white">كيف نبني الهوية الذكية خطوة بخطوة</h1>
                    <p className="text-white/70">
                        طورنا عملية مكونة من سبع شاشات ومحطات محددة لضمان أن كل نشاط تجاري يظهر بأفضل صورة ويملك بيانات دقيقة.
                    </p>
                </section>

                <section className="mt-16 grid gap-6 md:grid-cols-2">
                    {phases.map((phase) => (
                        <Card key={phase.title} className="border-white/10 bg-white/5 text-white">
                            <CardHeader className="flex items-center gap-4">
                                <div className="rounded-2xl bg-white/10 p-3">
                                    <phase.icon className="size-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-white">{phase.title}</CardTitle>
                                    <CardDescription className="text-white/70">{phase.details}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </section>

                <section className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <Card className="border-white/10 bg-white/5 text-white">
                        <CardHeader>
                            <CardTitle className="text-3xl text-white">أتمتة كاملة في الخلفية</CardTitle>
                            <CardDescription className="text-white/70">
                                كل تغيير تقوم به في اللوحة يمر عبر خدمة payload وخطافات المراقبة ليبقى موقعك متسقاً وسريعاً.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-white/80">
                                {automation.map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <ArrowRight className="size-4 text-cyan-300" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="border-white/10 bg-white/5 text-white">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-2xl text-white">ثيمات مرنة</CardTitle>
                            <CardDescription className="text-white/70">
                                نمزج الثيم الافتراضي مع تخصيصاتك باستخدام resolvedTheme لضمان تجربة متجانسة.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-2xl border border-white/10 p-4">
                                <div className="flex items-center gap-3 text-sm text-white/70">
                                    <Layers className="size-4 text-cyan-300" />
                                    <span>merge(theme.config, custom_theme_overrides)</span>
                                </div>
                                <p className="mt-3 text-white">
                                    النتيجة: تصميم جاهز لجميع الأقسام العامة مع دعم كامل لـ RTL.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </MarketingLayout>
        </>
    );
}
