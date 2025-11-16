import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="منصة رابطي">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=cairo:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
                <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-12">
                    <header className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-white/70">الهوية الذكية</p>
                            <h1 className="text-3xl font-semibold text-white">رابطي</h1>
                        </div>
                        <nav className="flex items-center gap-4 text-sm">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full border border-white/30 px-5 py-2 text-white transition hover:border-white"
                                >
                                    الذهاب إلى اللوحة
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-full border border-transparent px-4 py-2 text-white transition hover:border-white/40"
                                    >
                                        تسجيل الدخول
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-full border border-white/40 px-4 py-2 text-white transition hover:border-white"
                                        >
                                            إنشاء حساب
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="grid gap-12 lg:grid-cols-2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold leading-snug">
                                هوية رقمية أسرع
                                <span className="block text-cyan-300"> وصفحات ذكية باللغة العربية</span>
                            </h2>
                            <p className="text-lg text-white/70">
                                صمّم صفحتك، شارك الروابط والمنتجات، وتتبع النقرات والزيارات في لحظة. تم بناء رابطي خصيصاً
                                للأعمال العربية التي تبحث عن تجربة أنيقة وسريعة.
                            </p>
                            <ul className="space-y-3 text-white/80">
                                <li>• إنشاء صفحات عامة بسرعة باستخدام الثيمات الجاهزة.</li>
                                <li>• تنظيم الروابط، المنتجات والقوائم بالعربية.</li>
                                <li>• تحليلات لحظية للنقرات والزيارات مع دعم الأجهزة المتنقلة.</li>
                            </ul>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="rounded-full bg-cyan-400/90 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                                >
                                    ابدأ مجاناً
                                </Link>
                                <Link
                                    href="#features"
                                    className="rounded-full border border-white/30 px-6 py-3 text-white transition hover:border-white"
                                >
                                    استكشف المزايا
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                            <div className="space-y-4 text-sm text-white/80">
                                <div className="rounded-2xl border border-white/15 bg-slate-900/70 p-4">
                                    <p className="text-xs text-white/50">مثال رابط سريع</p>
                                    <p className="text-lg font-semibold">wa.me/9677xxxxxxx</p>
                                    <p className="text-white/60">يتتبع النقرات فوراً</p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-slate-900/70 p-4">
                                    <p className="text-xs text-white/50">قائمة منتجات</p>
                                    <p className="text-lg font-semibold">قهوتك المميزة - 2500 ريال</p>
                                    <p className="text-white/60">معروضة في الصفحة العامة</p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-slate-900/70 p-4">
                                    <p className="text-xs text-white/50">تحليلات</p>
                                    <p className="text-lg font-semibold">+125 زيارة اليوم</p>
                                    <p className="text-white/60">يتم تحديثها كل دقيقة</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    <section id="features" className="grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 text-sm text-white/80">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-white/50">مزايا</p>
                            <h3 className="text-2xl font-semibold text-white">منصة موثوقة للأعمال العربية</h3>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                                <h4 className="text-lg font-semibold text-white">تخصيص كامل</h4>
                                <p>ثيمات عربية وخصائص مرنة لتغيير الألوان والخطوط.</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                                <h4 className="text-lg font-semibold text-white">تكامل سريع</h4>
                                <p>أزرار واتساب، الاتصال، المواقع الاجتماعية وروابط المواقع.</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                                <h4 className="text-lg font-semibold text-white">تحليلات فورية</h4>
                                <p>زيارات ونقرات تسجّل لحظياً مع تحديد نوع الجهاز.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
