"use client";

import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";

type ServiceType = "website" | "social" | "both";
type Timeline = "regular" | "fast" | "rush";
type PackageType = "basic" | "complete" | "ecommerce";
type PricingStep = 1 | 2 | 3 | 4 | 5;

const INCLUDED_ECOMMERCE_PRODUCTS = 50;
const EXTRA_ECOMMERCE_PRODUCTS_STEP = 50;
const EXTRA_ECOMMERCE_PRODUCTS_COST = 500;

const money = (value: number) => `$${value.toLocaleString("en-US")}`;

function websitePrice(
  extraPagesCount: number,
  packageType: PackageType,
  products: number,
  clientHandlesHosting: boolean,
) {
  const base =
    packageType === "ecommerce"
      ? 6000
      : packageType === "complete"
        ? 4000
        : 2000;
  const firstPages = Math.min(extraPagesCount, 4) * 500;
  const extraPages = Math.max(extraPagesCount - 4, 0) * 350;
  const extraProducts =
    packageType === "ecommerce" && !clientHandlesHosting
      ? Math.ceil(
        Math.max(products - INCLUDED_ECOMMERCE_PRODUCTS, 0) /
        EXTRA_ECOMMERCE_PRODUCTS_STEP,
      ) * EXTRA_ECOMMERCE_PRODUCTS_COST
      : 0;
  return base + firstPages + extraPages + extraProducts;
}

function socialPrice(extraPosts: number, withWebsite: boolean) {
  const base = withWebsite ? 3000 : 3500;
  return base + (extraPosts / 5) * 200;
}

function calculatePrice(
  serviceType: ServiceType,
  pages: number,
  posts: number,
  packageType: PackageType,
  products: number,
  clientHandlesHosting: boolean,
  needContent: boolean,
  needSEO: boolean,
  timeline: Timeline,
) {
  const includedPages =
    packageType === "ecommerce" ? 8 : packageType === "complete" ? 4 : 2;
  const billablePages = includedPages + pages;
  const extraPagesServicesCost = (needContent ? 50 : 0) + (needSEO ? 50 : 0);
  let total =
    serviceType === "website"
      ? websitePrice(pages, packageType, products, clientHandlesHosting)
      : serviceType === "social"
        ? socialPrice(posts, false)
        : websitePrice(pages, packageType, products, clientHandlesHosting) + socialPrice(posts, true);
  if (serviceType !== "social") total += billablePages * extraPagesServicesCost;
  if (timeline === "rush" && serviceType !== "social") total *= 1.3;
  if (timeline === "fast" && serviceType !== "social") total *= 1.15;
  return total;
}

export function PricingHome2() {
  const [serviceType, setServiceType] = useState<ServiceType>("both");
  const [step, setStep] = useState<PricingStep>(1);
  const [pages, setPages] = useState(0);
  const [products, setProducts] = useState(INCLUDED_ECOMMERCE_PRODUCTS);
  const [clientHandlesHosting, setClientHandlesHosting] = useState(false);
  const [posts, setPosts] = useState(0);
  const [packageType, setPackageType] = useState<PackageType>("basic");
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<Timeline>("regular");
  const price = useMemo(
    () =>
      calculatePrice(
        serviceType,
        pages,
        posts,
        packageType,
        products,
        clientHandlesHosting,
        needContent,
        needSEO,
        timeline,
      ),
    [
      serviceType,
      pages,
      posts,
      packageType,
      products,
      clientHandlesHosting,
      needContent,
      needSEO,
      timeline,
    ],
  );
  const agency = Math.round(price * 1.8);
  const freelancer = Math.round(price * 1.25);
  const hasWebsite = serviceType !== "social";
  const hasSocial = serviceType !== "website";

  return (
    <section
      id="calculator-section"
      className="bg-slate-950 py-14 text-white md:py-20"
    >
      <Container>
        <header className="mx-auto mb-12 max-w-5xl text-center md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-400">
            Calcula tu proyecto
          </p>
          <Heading as="h2" className="mt-4 font-normal text-white">
            Un sitio web y redes sociales dentro de tu presupuesto
          </Heading>
        </header>
        <div className="grid rounded-2xl border border-white/10 lg:grid-cols-2">
          <div className="divide-y divide-white/10 bg-slate-950 p-8 lg:p-12">
            <div className="sticky top-32">
              <div className="mb-8 border-b border-white/10 pb-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-300">
                    Paso {step} de 5
                  </p>
                  <p className="text-xs text-slate-500">
                    {step === 1
                      ? "Servicio"
                      : step === 2
                        ? "Tipo de proyecto"
                        : step === 3
                          ? "Alcance"
                          : step === 4
                            ? "Extras"
                            : "Entrega"}
                  </p>
                </div>
                <div
                  className="relative mx-1 h-6"
                  aria-label="Progreso del formulario"
                >
                  <div className="absolute left-0 right-0 top-2.5 h-1.5 rounded-full bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-blue-400 transition-[width] duration-700 ease-in-out"
                      style={{ width: `${((step - 1) / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              {step === 1 && <div className="pb-4 md:pb-8">
                <h3 className="mb-5 text-lg font-medium">
                  ¿Qué servicio necesitas?
                </h3>
                <div className="space-y-4">
                  {[
                    ["website", "Solo sitio web"],
                    ["social", "Solo redes sociales"],
                    ["both", "Sitio web + redes sociales"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      onClick={() => setServiceType(value as ServiceType)}
                      className="flex cursor-pointer items-center gap-3 text-sm text-slate-200"
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={value}
                        checked={serviceType === value}
                        onChange={() => setServiceType(value as ServiceType)}
                        className="h-5 w-5 appearance-none rounded-full border-2 border-slate-500 checked:border-blue-400 checked:bg-[radial-gradient(circle,_#60a5fa_0_4px,_transparent_5px)]"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>}
              {hasWebsite && (
                <div className="py-4 md:py-8">
                  {step === 2 && <>
                    <h3 className="mb-5 text-lg font-medium">
                      ¿Qué tipo de sitio necesitas?
                    </h3>
                    <div className="space-y-4">
                      {[
                        ["basic", "Sitio básico", "$2,000"],
                        ["complete", "Sitio completo", "$4,000"],
                        ["ecommerce", "Ecommerce", "$6,000"],
                      ].map(([value, label, amount]) => (
                        <label
                          key={value}
                          className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-200"
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="packageType"
                              value={value}
                              checked={packageType === value}
                              onChange={() => setPackageType(value as PackageType)}
                              className="h-5 w-5 appearance-none rounded-full border-2 border-slate-500 checked:border-blue-400 checked:bg-[radial-gradient(circle,_#60a5fa_0_4px,_transparent_5px)]"
                            />
                            {label}
                          </span>
                          <span className="text-blue-300">Desde {amount}</span>
                        </label>
                      ))}
                    </div>
                  </>}
                  {step === 3 && <>
                    <div className="mb-4 mt-8 flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        Número de páginas extra{" "}
                        <span className="text-blue-300">({pages})</span>
                      </h3>
                      <span className="font-mono text-sm text-slate-400">
                        {pages} extras
                      </span>
                    </div>
                    <input aria-label="Número de páginas extra" type="range" min="0" max="30" step="1" value={pages} onChange={(event) => setPages(Number(event.target.value))} className="h-2 w-full cursor-pointer accent-blue-400" />
                    <div className="mt-2 flex justify-between text-xs text-slate-500"><span>0</span><span>30</span></div>
                    <p className="mt-3 text-xs text-slate-400">
                      Incluye{" "}
                      {packageType === "ecommerce"
                        ? 8
                        : packageType === "complete"
                          ? 4
                          : 2}{" "}
                      páginas. Cada página extra cuesta $500; después de 4 extras
                      baja a $350.
                    </p>
                    {packageType === "ecommerce" && (
                      <div className="mt-8 border-t border-white/10 pt-8">
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-200">
                          <span className="relative mt-0.5 block h-5 w-5 shrink-0">
                            <input
                              type="checkbox"
                              checked={clientHandlesHosting}
                              onChange={() => setClientHandlesHosting((current) => !current)}
                              className="peer h-5 w-5 appearance-none rounded border-2 border-slate-500 checked:border-blue-400 checked:bg-blue-400"
                            />
                            <Check className="pointer-events-none absolute inset-0 m-auto hidden text-slate-950 peer-checked:block" size={14} strokeWidth={3} />
                          </span>
                          <span>
                            Yo me haré cargo del hosting y del rendimiento del sitio
                            <span className="mt-1 block text-xs leading-5 text-slate-500">
                              Sin límite ni costo extra por cantidad de productos.
                            </span>
                          </span>
                        </label>
                        {!clientHandlesHosting && <>
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-medium">
                              Productos del catálogo{" "}
                              <span className="text-blue-300">({products})</span>
                            </h3>
                            <span className="font-mono text-sm text-slate-400">
                              {products} productos
                            </span>
                          </div>
                          <input
                            aria-label="Número de productos del catálogo"
                            type="range"
                            min={INCLUDED_ECOMMERCE_PRODUCTS}
                            max="500"
                            step={EXTRA_ECOMMERCE_PRODUCTS_STEP}
                            value={products}
                            onChange={(event) => setProducts(Number(event.target.value))}
                            className="h-2 w-full cursor-pointer accent-blue-400"
                          />
                          <div className="mt-2 flex justify-between text-xs text-slate-500">
                            <span>{INCLUDED_ECOMMERCE_PRODUCTS}</span>
                            <span>500</span>
                          </div>
                          <p className="mt-3 text-xs text-slate-400">
                            El paquete ecommerce incluye hasta 50 productos para cuidar
                            el rendimiento, el tamaño y la estabilidad del sitio. Cada
                            bloque adicional de 50 productos suma +$500.
                          </p>
                        </>}
                        {clientHandlesHosting && (
                          <p className="mt-6 rounded-xl border border-blue-400/20 bg-blue-400/10 p-4 text-xs leading-5 text-blue-100">
                            Puedes manejar la cantidad de productos que necesites;
                            la cotización no agregará cargos por volumen.
                          </p>
                        )}
                      </div>
                    )}
                  </>}
                </div>
              )}
              {hasSocial && (
                <div className={step === 3 ? "py-4 md:py-8" : "hidden"}>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      Publicaciones para redes{" "}
                      <span className="text-blue-300">({posts} extra)</span>
                    </h3>
                    <span className="font-mono text-sm text-slate-400">
                      {posts} extras
                    </span>
                  </div>
                  <input aria-label="Publicaciones extra para redes" type="range" min="0" max="50" step="5" value={posts} onChange={(event) => setPosts(Number(event.target.value))} className="h-2 w-full cursor-pointer accent-blue-400" />
                  <div className="mt-2 flex justify-between text-xs text-slate-500"><span>0</span><span>50</span></div>
                  <p className="mt-3 text-xs text-slate-400">
                    Incluye 2 redes sociales con hasta 3 publicaciones a la
                    semana. Cada 5 publicaciones extra por mes: +$200.
                  </p>
                </div>
              )}
              {hasWebsite && (
                <div className={step === 4 ? "py-4 md:py-8" : "hidden"}>
                  <h3 className="mb-5 text-lg font-medium">Extras</h3>
                  <div className="space-y-4">
                    {[
                      [
                        needContent,
                        setNeedContent,
                        "Necesito ayuda con el contenido",
                        "+$50/página",
                      ],
                      [
                        needSEO,
                        setNeedSEO,
                        "Quiero optimizar mi sitio para SEO",
                        "+$50/página",
                      ],
                    ].map(([checked, setter, label, extra]) => (
                      <label
                        key={label as string}
                        className="flex cursor-pointer items-center justify-between gap-4 text-sm text-slate-200"
                      >
                        <span className="flex items-center gap-3">
                          <span className="relative block h-5 w-5 shrink-0">
                            <input
                              type="checkbox"
                              checked={checked as boolean}
                              onChange={() =>
                                (
                                  setter as React.Dispatch<
                                    React.SetStateAction<boolean>
                                  >
                                )(!(checked as boolean))
                              }
                              className="peer h-5 w-5 appearance-none rounded border-2 border-slate-500 checked:border-blue-400 checked:bg-blue-400"
                            />
                            <Check className="pointer-events-none absolute inset-0 m-auto hidden text-slate-950 peer-checked:block" size={14} strokeWidth={3} />
                          </span>
                          {label as string}
                        </span>
                        <span className="shrink-0 text-blue-300">
                          {extra as string}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-slate-500">
                    Estos extras se calculan sobre todas las páginas del proyecto,
                    incluidas las páginas base y las adicionales.
                  </p>
                </div>
              )}
              {hasWebsite && (
                <div className={step === 5 ? "pt-8" : "hidden"}>
                  <h3 className="mb-5 text-lg font-medium">
                    ¿Qué tan rápido lo necesitas?
                  </h3>
                  <div className="space-y-4">
                    {[
                      ["rush", "En 7 dias", "+30%"],
                      ["fast", "En 14 dias", "+15%"],
                      [
                        "regular",
                        "Velocidad regular (según lo acordado)",
                        "sin costo extra",
                      ],
                    ].map(([value, label, extra]) => (
                      <label
                        key={value}
                        className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-200"
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="timeline"
                            value={value}
                            checked={timeline === value}
                            onChange={() => setTimeline(value as Timeline)}
                            className="h-5 w-5 appearance-none rounded-full border-2 border-slate-500 checked:border-blue-400 checked:bg-[radial-gradient(circle,_#60a5fa_0_4px,_transparent_5px)]"
                          />
                          {label}
                        </span>
                        <span className="shrink-0 text-blue-300">{extra}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-8">
                <button
                  type="button"
                  onClick={() => setStep((current) => (current === 1 ? 1 : (current - 1) as PricingStep))}
                  disabled={step === 1}
                  className="rounded-lg border border-white/15 px-5 py-3 text-sm text-slate-300 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Atrás
                </button>
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep((current) => (current + 1) as PricingStep)}
                    className="rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400 active:translate-y-px"
                  >
                    Siguiente
                  </button>
                ) : (
                  <span className="text-right text-xs leading-5 text-slate-500">
                    Revisa tu estimación y conversemos para confirmar el alcance.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="min-h-[717px] border-t border-white/10 bg-slate-900/70 p-8 lg:rounded-r-2xl lg:border-l lg:border-t-0 lg:p-12">
            <div className="lg:sticky lg:top-28">
              <h3 className="font-display text-3xl font-normal">
                Costo estimado
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                Una estimación basada en tu servicio, páginas, publicaciones,
                extras y tiempo de entrega.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 flex-col-reverse md:flex-col">
                <EstimateCard
                  title="Una agencia normalmente cobra minimo"
                  price={agency}
                  subtitle="+ Más tiempo y costos adicionales"
                />
                <EstimateCard
                  title="Un freelancer normalmente cobra minimo"
                  price={freelancer}
                  subtitle="+ Más vueltas y seguimiento"
                />
                <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-6 text-white">
                  <p className="text-sm font-medium">Con AionSite</p>
                  <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
                    <AnimatedMoney value={price} />
                  </p>
                  <p className="mt-3 text-sm text-white/85">
                    Ahorra dinero, tiempo y preocupaciones
                  </p>
                </div>
              </div>
              <p className="mt-6 md:mt-8 text-xs leading-5 text-slate-500">
                Esta estimación es un punto de partida. El alcance, la inversión y
                el tiempo final se confirman después de conversar.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function EstimateCard({
  title,
  price,
  subtitle,
}: {
  title: string;
  price: number;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-6">
      <p className="text-xs md:text-sm text-slate-300">{title}</p>
      <p className="mt-2 text-3xl md:text-4xl font-bold tracking-tight"><AnimatedMoney value={price} /></p>
      <p className="mt-3 text-xs md:text-sm text-slate-400">{subtitle}</p>
      <div className="mt-4 flex items-center gap-2 text-[10px] md:text-xs text-blue-300">
        <Check size={14} />
        Referencia de mercado
      </div>
    </div>
  );
}

function AnimatedMoney({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = displayValue;
    const difference = value - startValue;
    const startTime = performance.now();
    const duration = 450;
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + difference * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return money(displayValue);
}
