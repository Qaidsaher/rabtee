import { MarketingLayout } from '@/components/marketing/marketing-layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    LineChart,
    MousePointerClick,
    Palette,
    ShieldCheck,
    Sparkles,
    TimerReset,
    Zap,
} from 'lucide-react';

const featureCards = [
    {
        title: 'ثيمات عربية ذكية',
        description: 'ثلاثة ثيمات احترافية قابلة للتخصيص بالكامل مع دعم الكتابة العربية وخيارات الخطوط.',
        icon: Palette,
    },
    {
        title: 'تجربة 7 شاشات',
        description: 'رحلة تفاعلية تمر عبر سبعة أقسام غنية بالمحتوى لضمان عرض متكامل للهوية.',
        icon: Sparkles,
    },
    {
        title: 'أتمتة الروابط',
        description: 'إضافة روابط الواتساب، المواقع، والمواقع الاجتماعية بنقرة واحدة وبإحصائيات فورية.',
        icon: MousePointerClick,
    },
    {
        title: 'تحليلات فورية',
        description: 'نحدد نوع الجهاز ونحدث بيانات الزيارات والنقرات لحظياً للحصول على قرارات أسرع.',
        icon: LineChart,
    },
    {
        title: 'أمان وخصوصية',
        description: 'بنية Laravel 12 مع حماية متقدمة للبيانات وامتثال كامل لسياسة الخصوصية.',
        icon: ShieldCheck,
    },
    {
        title: 'أداء عالي',
        description: 'نولد payload عام خفيف لعرض الصفحة العامة بسرعة مذهلة حتى في الشبكات البطيئة.',
        icon: Zap,
    },
];

const steps = [
    {
        title: 'عرّف هويتك',
        description: 'أدخل معلومات نشاطك، الشعار، والرسالة القصيرة، وسيتم توليد عنوان عام فريد.',
        time: 'دقيقة واحدة',
    },
    {
        title: 'أضف روابطك ومنتجاتك',
        description: 'رتب الروابط، قوائم الطعام، والخدمات مع ترتيب سهل السحب والتفعيل باللغة العربية.',
        time: '3 دقائق',
    },
    {
        title: 'اختر الثيم وشارك',
        description: 'جرّب الثيمات الثلاثة، عدّل الألوان، ثم شارك رابطك الذكي عبر الواتساب والشبكات.',
        time: 'فوراً',
    },
];

const themes = [
    {
        title: 'Dark Glass',
        accent: 'زجاج داكن فاخر',
        palette: ['#0f172a', '#1d4ed8', '#38bdf8'],
    },
    {
        title: 'Light Clean',
        accent: 'سطوع عصري',
        palette: ['#f8fafc', '#e2e8f0', '#0ea5e9'],
    },
    {
        title: 'Ocean Gradient',
        accent: 'تدرج مرن',
        palette: ['#0f172a', '#0ea5e9', '#38bdf8'],
    },
];

const testimonials = [
    {
        name: 'قهوتي اليمنية',
        title: 'سلسلة مقاهي مستقلة',
        quote: 'استطعنا إضافة المنيو وروابط التوصيل بالعربية خلال عشر دقائق فقط، والصفحة العامة أسرع من أي موقع آخر.',
    },
    {
        name: 'د. أروى العريقي',
        title: 'عيادة تجميل',
        quote: 'أستلم تقارير الزيارات والنقرات يومياً مع تحديد الأجهزة، ما ساعدني على تحسين أوقات التواصل.',
    },
    {
        name: 'أستوديو نبض',
        title: 'استوديو تصميم رقمي',
        quote: 'الثيمات المتاحة والأزرار العربية الجاهزة أعطتنا مظهراً احترافياً فورياً بدون فريق تقني.',
    },
];

const plans = [
    {
        title: 'مجاني',
        price: '0 ر.ي / شهر',
        perks: ['ثيم افتراضي', '10 روابط نشطة', 'تحليلات يومية'],
        highlight: 'مناسب للبدايات',
    },
    {
        title: 'محترف',
        price: '4,900 ر.ي / شهر',
        perks: ['ثيمات كاملة + تخصيص', 'روابط ومنتجات غير محدودة', 'تصدير تحليلات', 'دعم خلال 24 ساعة'],
        highlight: 'الأكثر شعبية',
    },
];

const faqs = [
    {
        question: 'كيف تظل الصفحة العامة سريعة؟',
        answer: 'نقوم بتجهيز payload JSON متكامل لكل نشاط بمجرد تعديل المحتوى، ما يعني عدم وجود استعلامات ثقيلة عند زيارة الصفحة العامة.',
    },
    {
        question: 'هل يمكنني تعديل الثيم؟',
        answer: 'نعم، يمكنك مزج إعدادات الثيم مع تخصيصاتك الخاصة عبر overrides مباشرة من لوحة التحكم بالعربية.',
    },
    {
        question: 'كيف يتم تتبع الزيارات؟',
        answer: 'نستخدم وظائف طوابير لتسجيل الزيارات والنقرات مع تحديد الجهاز والآي بي، ويمكنك عرض التحليلات في لوحة مفصلة.',
    },
    {
        question: 'هل المنصة مناسبة للفرق؟',
        answer: 'نعم، يمكن لكل نشاط إضافة عدة منتجات وروابط بترتيب خاص، كما ندعم توسيع الميزات تدريجياً مع نمو عملك.',
    },
];

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;
    const primaryCtaHref = auth.user ? dashboard() : canRegister ? register() : login();
    const primaryCtaLabel = auth.user ? 'اذهب إلى أعمالك' : canRegister ? 'ابدأ مجاناً' : 'تسجيل الدخول';
    const contactCtaLabel = auth.user ? 'افتح لوحتك الآن' : canRegister ? 'إنشاء صفحة مجانية' : 'تسجيل الدخول';
    const contactCtaHref = auth.user ? dashboard() : canRegister ? register() : login();

    return (
        <>
            <Head title="منصة رابطي">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=cairo:400,500,600,700" rel="stylesheet" />
            </Head>
            <MarketingLayout>
                <section id="hero" className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-8">
                        <Badge className="bg-cyan-400/20 text-cyan-200">هوية عربية ذكية</Badge>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                                منصة متكاملة عبر 7 شاشات تضع علامتك العربية في المقدمة
                            </h1>
                            <p className="text-lg text-white/70">
                                صممت رابطي لرواد الأعمال والمبدعين العرب لتجهيز صفحات عامة فائقة السرعة مع روابط، قوائم، وثيمات مخصصة
                                تبني الثقة من أول نقرة.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                                <Link href={primaryCtaHref}>{primaryCtaLabel}</Link>
                            </Button>
                            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                <a href="#features">استكشف المزايا</a>
                            </Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                { label: 'روابط مفعلة', value: '+2,300' },
                                { label: 'زيارات يومية', value: '18K' },
                                { label: 'نقرات موثقة', value: '640K' },
                            ].map((stat) => (
                                <Card key={stat.label} className="border-white/10 bg-white/5 text-white">
                                    <CardHeader className="pb-2">
                                        <CardDescription className="text-white/60">{stat.label}</CardDescription>
                                        <CardTitle className="text-2xl text-white">{stat.value}</CardTitle>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl" />
                        <Card className="h-full rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur">
                            <CardHeader>
                                <CardDescription className="text-white/70">معاينة الصفحة العامة</CardDescription>
                                <CardTitle className="text-2xl text-white">rabti.me/your-brand</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-2xl border border-white/15 bg-slate-900/60 p-4">
                                    <div className="flex items-center justify-between text-sm text-white/70">
                                        <span>أزرار فورية</span>
                                        <span className="text-xs text-cyan-300">+54%</span>
                                    </div>
                                    <p className="text-lg font-semibold">واتساب، اتصال، خرائط</p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-slate-900/60 p-4">
                                    <div className="flex items-center justify-between text-sm text-white/70">
                                        <span>قائمة منتجات</span>
                                        <span className="text-xs text-cyan-300">محدثة ذاتياً</span>
                                    </div>
                                    <p className="text-lg font-semibold">قهوة مخمرة - 2,500 ر.ي</p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-slate-900/60 p-4">
                                    <div className="flex items-center justify-between text-sm text-white/70">
                                        <span>تحليلات اليوم</span>
                                        <span className="text-xs text-green-300">+18%</span>
                                    </div>
                                    <p className="text-lg font-semibold">125 زيارة • 67 نقرة</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section id="features" className="mt-24 space-y-10">
                    <div className="space-y-3 text-right">
                        <Badge variant="secondary" className="bg-white/10 text-white">
                            المزايا الرئيسية
                        </Badge>
                        <h2 className="text-3xl font-semibold text-white">كل ما تحتاجه لبناء هوية ورحلة من سبع مراحل</h2>
                        <p className="text-white/70">نغطي الثيمات، المحتوى، التحليلات، والخصوصية في واجهة واحدة.</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {featureCards.map((feature) => (
                            <Card key={feature.title} className="border-white/10 bg-white/5 text-white">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="rounded-2xl bg-white/10 p-3 text-white">
                                        <feature.icon className="size-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                                        <CardDescription className="text-white/70">
                                            {feature.description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="workflow" className="mt-24 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-4">
                        <Badge variant="secondary" className="bg-white/10 text-white">
                            كيف نعمل
                        </Badge>
                        <h2 className="text-3xl font-semibold text-white">خطوات مضبوطة لإنشاء صفحتك</h2>
                        <p className="text-white/70">
                            صممنا التدفق ليغطي سبع شاشات كاملة من التعريف حتى التحليلات، مع مكونات تفاعلية لكل جزء.
                        </p>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center gap-3 text-white">
                                <TimerReset className="size-6 text-cyan-300" />
                                <div>
                                    <p className="text-sm text-white/70">متوسط زمن الإعداد</p>
                                    <p className="text-2xl font-semibold">6 دقائق</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <Card key={step.title} className="border-white/10 bg-white/5 text-white">
                                <CardHeader>
                                    <div className="flex items-center justify-between text-sm text-white/60">
                                        <span>المرحلة {index + 1}</span>
                                        <span>{step.time}</span>
                                    </div>
                                    <CardTitle className="text-2xl text-white">{step.title}</CardTitle>
                                    <CardDescription className="text-white/70">
                                        {step.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="themes" className="mt-24 space-y-8">
                    <div className="space-y-3 text-right">
                        <Badge variant="secondary" className="bg-white/10 text-white">
                            الثيمات
                        </Badge>
                        <h2 className="text-3xl font-semibold text-white">تجارب مرئية محلية الهوية</h2>
                        <p className="text-white/70">ثلاث ثيمات احترافية مع إمكانية دمج الألوان لتناسب علامتك.</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {themes.map((theme) => (
                            <Card key={theme.title} className="border-white/10 bg-white/5 text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-white">{theme.title}</CardTitle>
                                    <CardDescription className="text-white/70">{theme.accent}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex gap-2">
                                    {theme.palette.map((color) => (
                                        <span
                                            key={color}
                                            className="h-12 w-full rounded-2xl"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="analytics" className="mt-24 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                        <Badge variant="secondary" className="bg-white/10 text-white">
                            الأداء والتحليلات
                        </Badge>
                        <h2 className="text-3xl font-semibold text-white">بيانات فورية تعطيك أفضلية تنافسية</h2>
                        <p className="text-white/70">
                            نستخدم وظائف مؤجلة لضمان تسجيل كل زيارة ونقرة مع تحديد نوع الجهاز، ما يتيح لك مراقبة الجمهور بدقة.
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card className="border-white/10 bg-white/5 text-white">
                                <CardHeader className="space-y-1">
                                    <CardDescription className="text-white/60">نسبة التحويل</CardDescription>
                                    <CardTitle className="text-3xl text-white">42%</CardTitle>
                                    <CardDescription className="text-emerald-300">+6% هذا الأسبوع</CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="border-white/10 bg-white/5 text-white">
                                <CardHeader className="space-y-1">
                                    <CardDescription className="text-white/60">متوسط زمن التفاعل</CardDescription>
                                    <CardTitle className="text-3xl text-white">1:12 دقيقة</CardTitle>
                                    <CardDescription className="text-cyan-300">متسق عبر الأجهزة</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                    <Card className="border-white/10 bg-white/5 text-white">
                        <CardHeader>
                            <CardDescription className="text-white/70">مخطط نقرات أسبوعي</CardDescription>
                            <CardTitle className="text-2xl text-white">تفاعل متعدد الأجهزة</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 rounded-3xl border border-white/10 bg-gradient-to-b from-cyan-500/20 to-slate-900/40 p-6">
                                <div className="flex h-full items-end gap-3">
                                    {[45, 60, 75, 50, 90, 120, 80].map((value, index) => (
                                        <div key={index} className="flex-1">
                                            <div className="rounded-t-2xl bg-white/60" style={{ height: `${value}%` }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section id="testimonials" className="mt-24 space-y-8">
                    <div className="space-y-3 text-right">
                        <Badge variant="secondary" className="bg-white/10 text-white">
                            قصص نجاح
                        </Badge>
                        <h2 className="text-3xl font-semibold text-white">شركات عربية تثق في رابطي</h2>
                        <p className="text-white/70">من المقاهي إلى العيادات، ساعدنا الأنشطة على بيع المزيد خلال أسابيع.</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((story) => (
                            <Card key={story.name} className="border-white/10 bg-white/5 text-white">
                                <CardHeader>
                                    <CardTitle className="text-xl text-white">{story.name}</CardTitle>
                                    <CardDescription className="text-white/70">{story.title}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80">“{story.quote}”</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="pricing" className="mt-24 space-y-8">
                    <div className="space-y-3 text-right">
                        <Badge variant="secondary" className="bg-white/10 text-white">
                            الأسعار
                        </Badge>
                        <h2 className="text-3xl font-semibold text-white">خطط بسيطة للبدء والتوسع</h2>
                        <p className="text-white/70">اختر الخطة التي تناسب مرحلة نمو نشاطك.</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {plans.map((plan) => (
                            <Card key={plan.title} className="border-white/10 bg-white/5 text-white">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-2xl text-white">{plan.title}</CardTitle>
                                            <CardDescription className="text-white/70">{plan.highlight}</CardDescription>
                                        </div>
                                        <Badge className="bg-cyan-400/20 text-cyan-200">{plan.price}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-white/80">
                                        {plan.perks.map((perk) => (
                                            <li key={perk} className="flex items-center gap-2">
                                                <Activity className="size-4 text-cyan-300" />
                                                <span>{perk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="faq" className="mt-24 space-y-8">
                    <div className="space-y-3 text-right">
                        <Badge variant="secondary" className="bg-white/10 text-white">
                            الأسئلة الشائعة
                        </Badge>
                        <h2 className="text-3xl font-semibold text-white">إجابات واضحة ومبسطة</h2>
                        <p className="text-white/70">لا تزال لديك أسئلة؟ هنا أكثر ما يطرحه عملاؤنا.</p>
                    </div>
                    <Accordion type="single" collapsible className="rounded-3xl border border-white/10 bg-white/5">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={faq.question} value={`faq-${index}`} className="px-6 text-white">
                                <AccordionTrigger className="text-lg text-white">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-white/70">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                <section id="contact" className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-slate-950 p-10 text-center text-white">
                    <h2 className="text-3xl font-bold">جاهز للانطلاق؟</h2>
                    <p className="mt-3 text-white/80">جرب المنصة اليوم، أو تواصل معنا لعرض توضيحي سريع بالعربية.</p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                        <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
                            <Link href={contactCtaHref}>{contactCtaLabel}</Link>
                        </Button>
                        <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                            <a href="mailto:hello@rabti.me">مراسلتنا</a>
                        </Button>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}
