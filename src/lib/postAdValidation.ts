export type CategoryField = {
    id: number;
    name: string;
    attribute: string;
    valueType: string;
    isMandatory: boolean;
    minValue?: number;
    maxValue?: number;
    roles?: string[];
};

export type PostAdFormValues = Record<string, any>;

type GenericRequiredField = {
    key: string;
    label: string;
};

const GENERIC_REQUIRED_FIELDS: GenericRequiredField[] = [
    { key: "title", label: "Ad title" },
    { key: "description", label: "Description" },
    { key: "location", label: "Location" },
    { key: "seller_name", label: "Name" },
    { key: "phone", label: "Mobile phone number" },
];

export function validatePostAdForm(
    fields: CategoryField[],
    values: PostAdFormValues
): string[] {
    const errors: string[] = [];

    //  Validate generic fields (title, description, etc.)
    for (const gf of GENERIC_REQUIRED_FIELDS) {
        const val = values[gf.key];
        if (val == null || String(val).trim() === "") {
            errors.push(`Please fill "${gf.label}".`);
        }
    }

    // Simple phone format check
    const phone = values["phone"];
    if (phone != null && String(phone).trim() !== "") {
        const digits = String(phone).replace(/\D/g, "");
        if (digits.length < 7 || digits.length > 15) {
            errors.push(`Please enter a valid mobile phone number.`);
        }
    }

    for (const field of fields) {
        if ((field.roles || []).includes("exclude_from_post_an_ad")) continue;

        const attr = field.attribute;
        const label = field.name || attr;
        const val = values[attr];

        if (!field.isMandatory) continue;

        if (field.valueType === "enum") {
            if (val == null || String(val).trim() === "") {
                errors.push(`Please select a value for "${label}".`);
            }
            continue;
        }

        if (field.valueType === "enum_multiple") {
            if (!Array.isArray(val) || val.length === 0) {
                errors.push(`Please select at least one option for "${label}".`);
            }
            continue;
        }

        if (field.valueType === "number") {
            if (val == null || String(val).trim() === "") {
                errors.push(`Please enter a value for "${label}".`);
            } else {
                const num = Number(val);
                if (Number.isNaN(num)) {
                    errors.push(`"${label}" must be a valid number.`);
                } else {
                    if (field.minValue != null && num < field.minValue) {
                        errors.push(
                            `"${label}" must be at least ${field.minValue}.`
                        );
                    }
                    if (field.maxValue != null && num > field.maxValue) {
                        errors.push(
                            `"${label}" must be at most ${field.maxValue}.`
                        );
                    }
                }
            }
            continue;
        }

        if (val == null || String(val).trim() === "") {
            errors.push(`Please fill "${label}".`);
        }
    }

    return errors;
}
