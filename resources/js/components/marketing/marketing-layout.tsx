import { type PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const marketingNav = [
    { label: 'المنصة', href: '/' },
    { label: 'كيف نعمل', href: '/how-it-works' },
    { label: 'من نحن', href: '/about' },
    { label: 'الخصوصية', href: '/privacy' },
];

const footerColumns = [
    {
        title: 'المنتج',
        links: [
            { label: 'المزايا', href: '#features' },
            { label: 'الثيمات', href: '#themes' },
            { label: 'الأسعار', href: '#pricing' },
        ],
    },
    {
        title: 'الشركة',
        links: [
            { label: 'كيف نعمل', href: '/how-it-works' },
            { label: 'عن رابطي', href: '/about' },
            { label: 'سياسة الخصوصية', href: '/privacy' },
        ],
    },
    {
        title: 'الدعم',
        links: [
            { label: 'الأسئلة الشائعة', href: '#faq' },
            { label: 'تواصل معنا', href: '#contact' },
        ],
    },
];

export function MarketingLayout({ children, className }: PropsWithChildren<{ className?: string }>) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
            <div className="relative isolate overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),_transparent_60%)]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-[radial-gradient(circle_at_left,_rgba(14,165,233,0.15),_transparent_60%)] lg:block" />

                <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between gap-8">
                            <Link href="/" className="text-2xl font-semibold tracking-tight text-white">
                                رابطي
                            </Link>
                            <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
                                {marketingNav.map((item) => (
                                    <Link key={item.label} href={item.href} className="transition hover:text-white">
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            {auth.user ? (
                                <Button asChild variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                                    <Link href={dashboard()}>
                                        الذهاب إلى اللوحة
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" className="text-white/80 hover:text-white">
                                        <Link href={login()}>
                                            تسجيل الدخول
                                        </Link>
                                    </Button>
                                    <Button asChild className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                                        <Link href={register()}>
                                            ابدأ مجاناً
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className={cn('mx-auto w-full max-w-7xl px-6 py-12 lg:py-16', className)}>
                    {children}
                </main>

                    <footer className="mt-16 border-t border-white/10 bg-slate-950/80">
                        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 text-sm text-white/70 lg:grid-cols-[1.5fr_2fr]">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-white">رابطي</h3>
                                <p>
                                    منصة الهوية الذكية والروابط العربية للأعمال، نصنع تجربة رقمية متكاملة وسريعة لضمان حضور مميز على
                                    الإنترنت.
                                </p>
                                <div className="text-xs text-white/50">© {new Date().getFullYear()} جميع الحقوق محفوظة.</div>
                            </div>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {footerColumns.map((column) => (
                                    <div key={column.title}>
                                        <h4 className="text-white">{column.title}</h4>
                                        <ul className="mt-3 space-y-2">
                                            {column.links.map((link) => (
                                                <li key={link.label}>
                                                    {link.href.startsWith('/') ? (
                                                        <Link href={link.href} className="text-white/70 transition hover:text-white">
                                                            {link.label}
                                                        </Link>
                                                    ) : (
                                                        <a href={link.href} className="text-white/70 transition hover:text-white">
                                                            {link.label}
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </footer>
            </div>
        </div>
    );
}
