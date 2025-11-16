import { MarketingLayout } from '@/components/marketing/marketing-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { Globe, HeartHandshake, Layers3, Users } from 'lucide-react';

const values = [
    {
        title: 'هوية عربية أولاً',
        description: 'نبني كل تجربة بعناية لتتناسب مع اللغة العربية والكتابة من اليمين لليسار.',
        icon: Globe,
    },
    {
        title: 'سرعة وأداء',
        description: 'نركز على payloads خفيفة وبنية قابلة للتوسع لضمان تحميل سريع دائماً.',
        icon: Layers3,
    },
    {
        title: 'ثقة وشراكة',
        description: 'نرافق الشركات الصغيرة والكبرى بخطط دعم متعددة ولغة عربية واضحة.',
        icon: HeartHandshake,
    },
    {
        title: 'مجتمع مبدع',
        description: 'نستمع باستمرار للملاحظات ونطلق تحسينات شهرية مبنية على احتياجات المستخدمين.',
        icon: Users,
    },
];

const milestones = [
    { year: '2023', detail: 'ولادة فكرة رابطي لتقديم صفحات سريعة للروابط العربية.' },
    { year: '2024', detail: 'إطلاق النسخة الأولى بميزات الروابط والمنتجات والتحليلات.' },
    { year: '2025', detail: 'إدخال الثيمات الذكية، الأتمتة، وتوسعة واجهات لوحة التحكم.' },
];

export default function AboutPage() {
    return (
        <>
            <Head title="عن رابطي" />
            <MarketingLayout>
                <section className="space-y-4 text-right">
                    <Badge className="bg-white/10 text-white">من نحن</Badge>
                    <h1 className="text-4xl font-bold text-white">فريق عربي يصنع هوية رقمية فريدة</h1>
                    <p className="text-white/70">
                        رابطي وُلد ليحل مشكلة الهوية والروابط لدى الشركات العربية التي تبحث عن تجربة حديثة ومترجمة بالكامل.
                    </p>
                </section>

                <section className="mt-16 grid gap-6 md:grid-cols-2">
                    {values.map((value) => (
                        <Card key={value.title} className="border-white/10 bg-white/5 text-white">
                            <CardHeader className="flex items-center gap-4">
                                <div className="rounded-2xl bg-white/10 p-3">
                                    <value.icon className="size-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-white">{value.title}</CardTitle>
                                    <CardDescription className="text-white/70">{value.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </section>

                <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
                    <h2 className="text-3xl font-semibold">محطات أساسية</h2>
                    <div className="mt-6 space-y-6">
                        {milestones.map((milestone) => (
                            <div key={milestone.year} className="flex flex-col gap-2 border-b border-white/10 pb-4 last:border-b-0">
                                <span className="text-sm text-white/60">{milestone.year}</span>
                                <p className="text-xl">{milestone.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}
