'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300', {
				'bg-background/80 supports-[backdrop-filter]:bg-background/40 border-border backdrop-blur-md':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
				<div className="flex items-center gap-8">
					<Link to="/" className="hover:opacity-80 transition-opacity">
						<span className="text-xl font-bold tracking-tight text-white">Efferd - AUV</span>
					</Link>
					<div className="hidden md:flex items-center gap-6">
						<Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
							About
						</Link>
						<Link to="/vehicles" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
							Vehicles
						</Link>
						<Link to="/team" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
							Team
						</Link>
						<Link to="/gallery" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
							Gallery
						</Link>
						<Link to="/media" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
							Media & Works
						</Link>
					</div>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6" asChild>
						<Link to="/contact">Contact Us</Link>
					</Button>
				</div>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => setOpen(!open)}
					className="md:hidden text-slate-300 hover:text-white hover:bg-white/10"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-6" duration={300} />
				</Button>
			</nav>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto pt-8">
				<div className="flex flex-col gap-6 px-4">
					<Link to="/about" className="text-2xl font-semibold text-slate-200 hover:text-white transition-colors" onClick={() => setOpen(false)}>
						About
					</Link>
					<Link to="/vehicles" className="text-2xl font-semibold text-slate-200 hover:text-white transition-colors" onClick={() => setOpen(false)}>
						Vehicles
					</Link>
					<Link to="/team" className="text-2xl font-semibold text-slate-200 hover:text-white transition-colors" onClick={() => setOpen(false)}>
						Team
					</Link>
					<Link to="/gallery" className="text-2xl font-semibold text-slate-200 hover:text-white transition-colors" onClick={() => setOpen(false)}>
						Gallery
					</Link>
					<Link to="/media" className="text-2xl font-semibold text-slate-200 hover:text-white transition-colors" onClick={() => setOpen(false)}>
						Media & Works
					</Link>
				</div>
				<div className="flex flex-col gap-4 mt-8 px-4 pb-8">
					<Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-full py-6 text-lg" asChild onClick={() => setOpen(false)}>
						<Link to="/contact">Contact Us</Link>
					</Button>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-[#020617]/98 supports-[backdrop-filter]:bg-[#020617]/80 backdrop-blur-xl',
				'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-white/10 md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:slide-in-from-bottom-8 data-[slot=open]:fade-in-0 ease-out duration-300',
					'size-full p-4',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	// also check on first load
	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
