import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";

type Option = { value: string; label: string };

export function Select({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Pilih lokasi",
  invalid = false,
  describedBy,
  required = false,
  variant = "default",
}: {
  id?: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
  variant?: "default" | "bar";
}) {
  const uid = useId();
  const triggerId = id ?? `select-${uid}`;
  const listId = `${triggerId}-list`;
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const typeahead = useRef({ value: "", time: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 200, maxHeight: 240 });
  const [placement, setPlacement] = useState("bottom");

  function expand() {
    setActive(
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    );
    setOpen(true);
  }

  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  useLayoutEffect(() => {
    if (!open) return;
    const popup = menu.current;
    popup?.showPopover();
    const update = () => {
      if (!trigger.current || !popup) return;
      const rect = trigger.current.getBoundingClientRect();
      const dialog = trigger.current.closest("dialog")?.getBoundingClientRect();
      const viewport = window.visualViewport;
      const leftBound = Math.max(8, dialog ? dialog.left + 8 : 8);
      const rightBound =
        Math.min(viewport?.width ?? innerWidth, dialog ? dialog.right - 8 : innerWidth) - 8;
      const topBound = Math.max(8, dialog ? dialog.top + 8 : 8);
      const bottomBound =
        Math.min(viewport?.height ?? innerHeight, dialog ? dialog.bottom - 8 : innerHeight) - 8;
      if (rect.bottom < topBound || rect.top > bottomBound) {
        setOpen(false);
        return;
      }
      const below = Math.max(0, bottomBound - rect.bottom - 6);
      const above = Math.max(0, rect.top - topBound - 6);
      const desired = Math.min(280, options.length * 56 + 12);
      const upward = below < desired && above > below;
      const maxHeight = Math.min(280, upward ? above : below);
      const width = Math.min(rect.width, rightBound - leftBound);
      popup.style.width = `${width}px`;
      popup.style.maxHeight = `${maxHeight}px`;
      const height = Math.min(popup.scrollHeight + 2, maxHeight);
      setPosition({
        width,
        maxHeight,
        left: Math.max(leftBound, Math.min(rect.left, rightBound - width)),
        top: upward ? Math.max(topBound, rect.top - height - 6) : rect.bottom + 6,
      });
      setPlacement(upward ? "top" : "bottom");
    };
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !popup?.contains(target)) setOpen(false);
    };
    const scroll = (event: Event) => {
      if (!popup?.contains(event.target as Node)) update();
    };
    update();
    const observer = new ResizeObserver(update);
    if (trigger.current) observer.observe(trigger.current);
    document.addEventListener("pointerdown", outside, true);
    document.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      popup?.hidePopover();
      observer.disconnect();
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, [open, options.length]);

  useLayoutEffect(() => {
    if (open)
      menu.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape" && !open) return;
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " ", "Escape"].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === "Escape") {
        setOpen(false);
      } else if (event.key === "Enter" || event.key === " ") {
        if (open) choose(active);
        else expand();
      } else if (!open) {
        expand();
        if (event.key === "End") setActive(options.length - 1);
      } else if (event.key === "Home") setActive(0);
      else if (event.key === "End") setActive(options.length - 1);
      else
        setActive(
          (index) =>
            (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length,
        );
    } else if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const now = Date.now();
      typeahead.current = {
        value:
          (now - typeahead.current.time < 700 ? typeahead.current.value : "") +
          event.key.toLowerCase(),
        time: now,
      };
      const index = options.findIndex((option) =>
        option.label.toLowerCase().startsWith(typeahead.current.value),
      );
      if (index >= 0) {
        setActive(index);
        setOpen(true);
      }
      event.preventDefault();
    }
  }

  return (
    <div className={`custom-select select-${variant}`}>
      <button
        ref={trigger}
        id={triggerId}
        type="button"
        className="select-trigger"
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : expand())}
        onKeyDown={keyboard}
      >
        <span className={value ? "" : "select-placeholder"}>
          {options.find((option) => option.value === value)?.label ?? placeholder}
        </span>
        <svg
          viewBox="0 0 20 20"
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="m5 8 5 5 5-5" />
        </svg>
      </button>
      {open &&
        createPortal(
          <div
            ref={menu}
            id={listId}
            className="select-menu"
            popover="manual"
            role="listbox"
            aria-label={label}
            data-placement={placement}
            style={position}
          >
            {options.map((option, index) => (
              <div
                id={`${listId}-${index}`}
                role="option"
                aria-selected={option.value === value}
                className={`select-option ${active === index ? "highlighted" : ""}`}
                data-index={index}
                key={option.value}
                onPointerMove={() => setActive(index)}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <svg
                    viewBox="0 0 20 20"
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <path d="m4 10 4 4 8-8" />
                  </svg>
                )}
              </div>
            ))}
          </div>,
          trigger.current?.closest("dialog") ?? document.body,
        )}
    </div>
  );
}
