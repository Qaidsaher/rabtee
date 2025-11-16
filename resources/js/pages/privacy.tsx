import { MarketingLayout } from '@/components/marketing/marketing-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { Lock, ShieldCheck, Smartphone } from 'lucide-react';

const privacyPoints = [
    {
        title: 'حماية البيانات',
        description: 'نستخدم تشفيراً قياسياً ونفصل بيانات المستخدمين عن الواجهات العامة لضمان عدم كشف أي معلومات حساسة.',
        icon: ShieldCheck,
    },
    {
        title: 'استخدام الزوار',
        description: 'نسجل معلومات عامة عن الزيارات والنقرات (نوع الجهاز، الوقت، عنوان IP) لأغراض التحليل فقط.',
        icon: Smartphone,
    },
    {
        title: 'تحكم كامل',
        description: 'يمكنك حذف الأنشطة، تحديث البيانات، أو طلب نسخة من بياناتك في أي وقت عبر لوحة التحكم.',
        icon: Lock,
    },
];

export default function PrivacyPage() {
    return (
        <>
            <Head title="سياسة الخصوصية" />
            <MarketingLayout>
                <section className="space-y-4 text-right">
                    <Badge className="bg-white/10 text-white">الخصوصية</Badge>
                    <h1 className="text-4xl font-bold text-white">نلتزم بحماية بياناتك وخصوصيتك</h1>
                    <p className="text-white/70">
                        تعتمد رابطي على معايير أمان حديثة وتسمح لك بالتحكم الكامل في بياناتك وروابطك العامة.
                    </p>
                </section>

                <section className="mt-16 grid gap-6 md:grid-cols-3">
                    {privacyPoints.map((point) => (
                        <Card key={point.title} className="border-white/10 bg-white/5 text-white">
                            <CardHeader className="flex items-center gap-4">
                                <div className="rounded-2xl bg-white/10 p-3">
                                    <point.icon className="size-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl text-white">{point.title}</CardTitle>
                                    <CardDescription className="text-white/70">{point.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </section>

                <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
                    <h2 className="text-2xl font-semibold">حقوقك</h2>
                    <ul className="mt-4 list-disc space-y-2 pr-6 text-white/80">
                        <li>يمكنك طلب تصدير البيانات أو حذفها بالكامل.</li>
                        <li>نرسل إشعارات واضحة عند تحديث السياسة أو إضافة أذونات جديدة.</li>
                        <li>دعم مخصص عبر البريد أو الواتساب لأي استفسار يتعلق بالخصوصية.</li>
                    </ul>
                </section>
            </MarketingLayout>
        </>
    );
}
