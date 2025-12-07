"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../layout/LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";
import Swal from "sweetalert2";
import {
    validatePostAdForm,
    CategoryField,
} from "@/lib/postAdValidation";

type RawChoice = {
    value: string;
    label: string;
    label_l1?: string;
    seoSlug?: { en?: string; ar?: string };
};

type RawField = {
    id: number;
    name: string;
    attribute: string;
    valueType: string;
    filterType: string;
    isMandatory: boolean;
    displayPriority: number;
    roles: string[];
    minValue?: number;
    maxValue?: number;
    choices?: RawChoice[];
};

type Props = {
    slug: string;
    flatFields: RawField[];
    categoryLabel?: string;
};

export default function PostAdAttributesForm({ slug, flatFields, categoryLabel }: Props) {
    const { language } = useLanguage();
    const t = useTranslation();
    const isArabic = language === "ar";

    // ignore fields that should not appear in post-an-ad
    const visibleFields = useMemo(
        () =>
            flatFields
                .filter((f) => !(f.roles || []).includes("exclude_from_post_an_ad"))
                .sort((a, b) => (a.displayPriority ?? 0) - (b.displayPriority ?? 0)) as CategoryField[],
        [flatFields]
    );

    const [values, setValues] = useState<Record<string, any>>({});

    const setField = (attr: string, val: any) => {
        setValues((prev) => ({ ...prev, [attr]: val }));
    };

    const getField = (attr: string) => values[attr] ?? "";

    const labelForChoice = (c: RawChoice) => {
        if (!isArabic) return c.label;
        return c.label_l1 || c.seoSlug?.ar || c.label;
    };

    const renderSelectField = (field: RawField) => {
        const choices = field.choices ?? [];

        return (
            <div key={field.id} className="mb-4">
                <label className="block text-xs font-semibold text-[#002f34] mb-1">
                    {field.name}
                    {field.isMandatory && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23e5db]"
                    value={getField(field.attribute)}
                    onChange={(e) => setField(field.attribute, e.target.value)}
                >
                    <option value="">
                        {t("postAd.selectPlaceholder") || "Select option"}
                    </option>
                    {choices.map((c) => (
                        <option key={c.value} value={c.value}>
                            {labelForChoice(c)}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const renderMultiChoiceChips = (field: RawField) => {
        const choices = field.choices ?? [];
        const current: string[] = values[field.attribute] ?? [];

        const toggle = (v: string) => {
            const exists = current.includes(v);
            const next = exists
                ? current.filter((x) => x !== v)
                : [...current, v];
            setField(field.attribute, next);
        };

        return (
            <div key={field.id} className="mb-4">
                <label className="block text-xs font-semibold text-[#002f34] mb-2">
                    {field.name}
                    {field.isMandatory && <span className="text-red-500 ml-1">*</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                    {choices.map((c) => {
                        const selected = current.includes(c.value);
                        return (
                            <button
                                key={c.value}
                                type="button"
                                onClick={() => toggle(c.value)}
                                className={[
                                    "px-3 py-1 rounded-full text-xs border",
                                    selected
                                        ? "bg-[#002f34] text-white border-[#002f34]"
                                        : "bg-white text-[#002f34] border-gray-300",
                                ].join(" ")}
                            >
                                {labelForChoice(c)}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderNumberField = (field: RawField) => {
        return (
            <div key={field.id} className="mb-4">
                <label className="block text-xs font-semibold text-[#002f34] mb-1">
                    {field.name}
                    {field.isMandatory && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    type="number"
                    min={field.minValue}
                    max={field.maxValue}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23e5db]"
                    value={getField(field.attribute)}
                    onChange={(e) => setField(field.attribute, e.target.value)}
                />
            </div>
        );
    };

    const renderField = (field: RawField) => {
        // I only render a subset that appears in the OLX website
        switch (field.attribute) {
            case "property_type":
            case "ownership":
            case "rooms":
            case "bathrooms":
            case "furnished":
            case "condition":
            case "floor_level":
            case "property_age":
            case "payment_option":
            case "price_type":
                return renderSelectField(field);

            case "features":
                return renderMultiChoiceChips(field);

            case "price":
            case "ft":
                return renderNumberField(field);

            default:
                return null;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validatePostAdForm(visibleFields, values);

        if (errors.length === 0) {
            Swal.fire({
                icon: "success",
                title: t("postAd.validationSuccessTitle") || "Ad ready to be submitted",
                text:
                    t("postAd.validationSuccessMessage") ||
                    "Your form looks good. (Submitting is not required for the assessment.)",
            });
            console.log("Valid payload to submit:", { slug, ...values });
        } else {
            Swal.fire({
                icon: "error",
                title: t("postAd.validationErrorTitle") || "Please fix the following:",
                html: `<ul style="text-align:left;margin:0;padding-left:1.2rem;">
                ${errors.map((err) => `<li>${err}</li>`).join("")}
            </ul>`,
            });
            console.warn("Validation errors:", errors);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-[#002f34]">
                    {t("postAd.sellYourAd") || "Sell your ad"}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                    {slug.replace(/-/g, " ")}
                </p>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold text-gray-500">
                        {t("postAd.category") || "Category"}
                    </p>
                    <p className="text-sm text-[#002f34]">
                        {categoryLabel ||
                            t("postAd.selectedCategory") ||
                            "Properties / Apartments & Villas For Sale"}
                    </p>
                </div>
                <button
                    type="button"
                    className="text-xs text-[#002f34] font-semibold underline"
                >
                    {t("postAd.changeCategory") || "Change"}
                </button>
            </div>

            <div className="mb-8">
                <p className="text-xs font-semibold text-[#002f34] mb-2">
                    {t("postAd.uploadImages") || "Upload Images"}
                </p>
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className="w-14 h-14 border border-dashed border-gray-300 rounded flex items-center justify-center text-xl text-gray-400"
                        >
                            +
                        </button>
                    ))}
                </div>
                <p className="mt-2 text-[11px] text-gray-400">
                    {t("postAd.coverHint") ||
                        "For the cover picture we recommend using the landscape mode."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                {visibleFields.map((field) => renderField(field))}
            </div>

            <hr className="my-6" />

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-[#002f34] mb-1">
                        {t("postAd.adTitle") || "Ad title"}
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23e5db]"
                        value={getField("title")}
                        onChange={(e) => setField("title", e.target.value)}
                    />
                    <p className="mt-1 text-[11px] text-gray-400">
                        {t("postAd.adTitleHint") ||
                            "Mention the key features of your item (e.g. brand, model, age, type)."}
                    </p>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-[#002f34] mb-1">
                        {t("postAd.description") || "Description"}
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                        rows={4}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23e5db]"
                        value={getField("description")}
                        onChange={(e) => setField("description", e.target.value)}
                    />
                    <p className="mt-1 text-[11px] text-gray-400">
                        {t("postAd.descriptionHint") ||
                            "Include condition, features and reason for selling."}
                    </p>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-[#002f34] mb-1">
                        {t("postAd.location") || "Location"}
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23e5db]"
                        value={getField("location")}
                        onChange={(e) => setField("location", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-[#002f34] mb-1">
                        {t("postAd.name") || "Name"}
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23e5db]"
                        value={getField("seller_name")}
                        onChange={(e) => setField("seller_name", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-[#002f34] mb-1">
                        {t("postAd.phone") || "Mobile Phone Number"}
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="tel"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23e5db]"
                        value={getField("phone")}
                        onChange={(e) => setField("phone", e.target.value)}
                    />
                </div>

                <div>
                    <p className="block text-xs font-semibold text-[#002f34] mb-1">
                        {t("postAd.contactMethod") || "Contact Method"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["phone", "chat", "both"].map((m) => {
                            const selected = getField("contact_method") === m;
                            const label =
                                m === "phone"
                                    ? t("postAd.contactPhone") || "Phone Number"
                                    : m === "chat"
                                        ? t("postAd.contactChat") || "OLX Chat"
                                        : t("postAd.contactBoth") || "Both";

                            return (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => setField("contact_method", m)}
                                    className={[
                                        "px-3 py-1 rounded-full text-xs border",
                                        selected
                                            ? "bg-[#002f34] text-white border-[#002f34]"
                                            : "bg-white text-[#002f34] border-gray-300",
                                    ].join(" ")}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 rounded bg-[#002f34] text-white text-sm font-semibold hover:bg-[#003b41]"
                >
                    {t("postAd.postNow") || "Post now"}
                </button>
            </div>
        </form>
    );
}
