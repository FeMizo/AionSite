"use client";

import { Plus, Trash2 } from "lucide-react";
import type { FieldDefinition } from "@/src/cms/types";
import { Switch } from "@/src/components/admin/Switch";
import { Button } from "@/src/components/ui/Button";

function updateNestedValue(target: unknown, path: string[], value: unknown): unknown {
  if (path.length === 0) {
    return value;
  }

  const [head, ...rest] = path;
  const source = target ?? (Number.isInteger(Number(head)) ? [] : {});

  if (Array.isArray(source)) {
    const index = Number(head);
    const next = [...source];
    next[index] = updateNestedValue(next[index], rest, value);
    return next;
  }

  return {
    ...(source as Record<string, unknown>),
    [head]: updateNestedValue(
      (source as Record<string, unknown>)[head],
      rest,
      value,
    ),
  };
}

function removeAtPath(target: unknown, path: string[]): unknown {
  const [head, ...rest] = path;

  if (Array.isArray(target)) {
    const index = Number(head);
    if (rest.length === 0) {
      return target.filter((_, itemIndex) => itemIndex !== index);
    }

    return target.map((item, itemIndex) =>
      itemIndex === index ? removeAtPath(item, rest) : item,
    );
  }

  if (!target || typeof target !== "object") {
    return target;
  }

  return {
    ...(target as Record<string, unknown>),
    [head]: removeAtPath((target as Record<string, unknown>)[head], rest),
  };
}

function getEmptyItem(field: Extract<FieldDefinition, { type: "array" }>) {
  if (field.itemFields) {
    return field.itemFields.reduce<Record<string, unknown>>((accumulator, itemField) => {
      accumulator[itemField.key] =
        itemField.type === "array"
          ? []
          : itemField.type === "boolean"
            ? false
            : "";
      return accumulator;
    }, {});
  }

  return "";
}

function getFieldValue(data: unknown, key: string) {
  if (key === "root") {
    return data;
  }

  return (data as Record<string, unknown>)[key];
}

export function SectionEditor({
  data,
  fields,
  onChange,
}: {
  data: unknown;
  fields: FieldDefinition[];
  onChange: (data: unknown) => void;
}) {
  const handleValueChange = (path: string[], value: unknown) => {
    onChange(updateNestedValue(data, path, value));
  };

  const renderField = (field: FieldDefinition, value: unknown, path: string[]) => {
    if (field.type === "array") {
      const items = Array.isArray(value) ? value : [];

      return (
        <div key={path.join(".") || field.key} className="rounded-3xl border border-white/8 bg-white/3 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white">{field.label}</h4>
              {field.description ? (
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {field.description}
                </p>
              ) : null}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                handleValueChange([...path, String(items.length)], getEmptyItem(field))
              }
            >
              <Plus size={16} />
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {items.map((item, index) => (
              <div
                key={`${field.key}-${index}`}
                className="rounded-2xl border border-white/8 bg-slate-950/70 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-white">
                    {field.itemLabel} {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => onChange(removeAtPath(data, [...path, String(index)]))}
                    className="rounded-full border border-white/8 p-2 text-slate-400 transition hover:border-rose-400/40 hover:text-rose-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {field.itemFields ? (
                    field.itemFields.map((itemField) => (
                      <div key={`${path.join(".")}-${index}-${itemField.key}`}>
                        {renderField(
                          itemField,
                          getFieldValue(item, itemField.key),
                          [...path, String(index), itemField.key],
                        )}
                      </div>
                    ))
                  ) : (
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {field.itemLabel}
                      </span>
                      <input
                        value={String(item ?? "")}
                        onChange={(event) =>
                          handleValueChange([...path, String(index)], event.target.value)
                        }
                        placeholder={field.placeholder}
                        className="w-full rounded-2xl border border-white/8 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/50"
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}

            {items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-500">
                No hay elementos configurados todavia.
              </p>
            ) : null}
          </div>
        </div>
      );
    }

    if (field.type === "boolean") {
      return (
        <div key={path.join(".") || field.key} className="rounded-3xl border border-white/8 bg-white/3 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white">{field.label}</h4>
              {field.description ? (
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {field.description}
                </p>
              ) : null}
            </div>
            <Switch
              checked={Boolean(value)}
              onChange={(checked) => handleValueChange(path, checked)}
            />
          </div>
        </div>
      );
    }

    const sharedClasses =
      "w-full rounded-2xl border border-white/8 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/50";

    return (
      <label key={path.join(".") || field.key} className="block rounded-3xl border border-white/8 bg-white/3 p-5">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {field.label}
        </span>
        {field.type === "textarea" ? (
          <textarea
            value={String(value ?? "")}
            onChange={(event) => handleValueChange(path, event.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={sharedClasses}
          />
        ) : (
          <input
            type={field.type === "number" ? "number" : "text"}
            value={String(value ?? "")}
            onChange={(event) => handleValueChange(path, event.target.value)}
            placeholder={field.placeholder}
            className={sharedClasses}
          />
        )}
        {field.description ? (
          <span className="mt-2 block text-xs leading-5 text-slate-500">
            {field.description}
          </span>
        ) : null}
      </label>
    );
  };

  return (
    <div className="space-y-4">
      {fields.map((field) =>
        renderField(
          field,
          getFieldValue(data, field.key),
          field.key === "root" ? [] : [field.key],
        ),
      )}
    </div>
  );
}
