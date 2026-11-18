"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../shared/Loading";
import { TIME_SLOTS, DEFAULT_SLOT_REGULAR_PRICES, formatPriceBn } from "@/lib/pricing";

const ManageSlotPrice = () => {
    const [pricingData, setPricingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArena, setSelectedArena] = useState("Royel Turf & Swimming Zone");
    const [activeDayTab, setActiveDayTab] = useState("regular"); // "regular" | "friday" | "saturday"

    const [arenaPricing, setArenaPricing] = useState({
        arenaName: "Royel Turf & Swimming Zone",
        defaultPrice: 2000,
        defaultRegularPrice: 2500,
        timeSlots: [],
        fridayDefaultPrice: null,
        fridayDefaultRegularPrice: null,
        fridayTimeSlots: [],
        saturdayDefaultPrice: null,
        saturdayDefaultRegularPrice: null,
        saturdayTimeSlots: []
    });
    const [saving, setSaving] = useState(false);

    const fetchPricing = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/pricing");
            const data = await res.json();
            if (res.ok) {
                setPricingData(data);
                const current = Array.isArray(data)
                    ? data.find(p => p.arenaName === selectedArena) || data[0]
                    : data;
                if (current) {
                    setArenaPricing({
                        arenaName: current.arenaName || selectedArena,
                        defaultPrice: current.defaultPrice || 2000,
                        defaultRegularPrice: current.defaultRegularPrice || 2500,
                        timeSlots: current.timeSlots || [],
                        fridayDefaultPrice: current.fridayDefaultPrice ?? null,
                        fridayDefaultRegularPrice: current.fridayDefaultRegularPrice ?? null,
                        fridayTimeSlots: current.fridayTimeSlots || [],
                        saturdayDefaultPrice: current.saturdayDefaultPrice ?? null,
                        saturdayDefaultRegularPrice: current.saturdayDefaultRegularPrice ?? null,
                        saturdayTimeSlots: current.saturdayTimeSlots || []
                    });
                } else {
                    setArenaPricing({
                        arenaName: selectedArena,
                        defaultPrice: 2000,
                        defaultRegularPrice: 2500,
                        timeSlots: [],
                        fridayDefaultPrice: null,
                        fridayDefaultRegularPrice: null,
                        fridayTimeSlots: [],
                        saturdayDefaultPrice: null,
                        saturdayDefaultRegularPrice: null,
                        saturdayTimeSlots: []
                    });
                }
            }
        } catch (err) {
            console.error("Error fetching pricing:", err);
            toast.error("Failed to fetch pricing data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPricing();
    }, [selectedArena]);

    // Handle Default Price for the active tab
    const handleDayDefaultPriceChange = (val) => {
        const numVal = val === "" ? null : Number(val);
        setArenaPricing(prev => {
            if (activeDayTab === "friday") {
                return { ...prev, fridayDefaultPrice: numVal };
            } else if (activeDayTab === "saturday") {
                return { ...prev, saturdayDefaultPrice: numVal };
            } else {
                return { ...prev, defaultPrice: Number(val) || 2000 };
            }
        });
    };

    // Handle Default Regular Price (strikethrough) for the active tab
    const handleDayDefaultRegularPriceChange = (val) => {
        const numVal = val === "" ? null : Number(val);
        setArenaPricing(prev => {
            if (activeDayTab === "friday") {
                return { ...prev, fridayDefaultRegularPrice: numVal };
            } else if (activeDayTab === "saturday") {
                return { ...prev, saturdayDefaultRegularPrice: numVal };
            } else {
                return { ...prev, defaultRegularPrice: Number(val) || 2500 };
            }
        });
    };

    // Handle Slot Price Change for the active tab
    const handleSlotPriceChange = (slot, price) => {
        const numPrice = price === "" ? "" : Number(price);

        setArenaPricing(prev => {
            let key = "timeSlots";
            if (activeDayTab === "friday") key = "fridayTimeSlots";
            if (activeDayTab === "saturday") key = "saturdayTimeSlots";

            const currentSlots = prev[key] || [];
            const existing = currentSlots.find(s => s.slot === slot);

            let newSlots;
            if (price === "") {
                if (existing?.regularPrice) {
                    newSlots = currentSlots.map(s => s.slot === slot ? { ...s, price: undefined } : s);
                } else {
                    newSlots = currentSlots.filter(s => s.slot !== slot);
                }
            } else if (existing) {
                newSlots = currentSlots.map(s => s.slot === slot ? { ...s, price: Number(price) } : s);
            } else {
                newSlots = [...currentSlots, { slot, price: Number(price) }];
            }

            return { ...prev, [key]: newSlots };
        });
    };

    // Handle Slot Regular Price (Strikethrough) Change for the active tab
    const handleSlotRegularPriceChange = (slot, regPrice) => {
        const numRegPrice = regPrice === "" ? "" : Number(regPrice);

        setArenaPricing(prev => {
            let key = "timeSlots";
            if (activeDayTab === "friday") key = "fridayTimeSlots";
            if (activeDayTab === "saturday") key = "saturdayTimeSlots";

            const currentSlots = prev[key] || [];
            const existing = currentSlots.find(s => s.slot === slot);

            let newSlots;
            if (regPrice === "") {
                if (existing?.price !== undefined) {
                    newSlots = currentSlots.map(s => s.slot === slot ? { ...s, regularPrice: null } : s);
                } else {
                    newSlots = currentSlots.filter(s => s.slot !== slot);
                }
            } else if (existing) {
                newSlots = currentSlots.map(s => s.slot === slot ? { ...s, regularPrice: Number(regPrice) } : s);
            } else {
                newSlots = [...currentSlots, { slot, regularPrice: Number(regPrice) }];
            }

            return { ...prev, [key]: newSlots };
        });
    };

    // Quick Action: Copy Regular overrides to Friday or Saturday
    const handleCopyFromRegular = () => {
        const regularOverrides = (arenaPricing.timeSlots || []).map(s => ({ ...s }));
        const regularDefault = arenaPricing.defaultPrice;
        const regularDefReg = arenaPricing.defaultRegularPrice;

        if (activeDayTab === "friday") {
            setArenaPricing(prev => ({
                ...prev,
                fridayDefaultPrice: prev.fridayDefaultPrice || regularDefault,
                fridayDefaultRegularPrice: prev.fridayDefaultRegularPrice || regularDefReg,
                fridayTimeSlots: regularOverrides
            }));
            toast.success("Copied Regular Day prices to Friday!");
        } else if (activeDayTab === "saturday") {
            setArenaPricing(prev => ({
                ...prev,
                saturdayDefaultPrice: prev.saturdayDefaultPrice || regularDefault,
                saturdayDefaultRegularPrice: prev.saturdayDefaultRegularPrice || regularDefReg,
                saturdayTimeSlots: regularOverrides
            }));
            toast.success("Copied Regular Day prices to Saturday!");
        }
    };

    // Quick Action: Clear overrides for active tab
    const handleClearOverrides = () => {
        let key = "timeSlots";
        if (activeDayTab === "friday") key = "fridayTimeSlots";
        if (activeDayTab === "saturday") key = "saturdayTimeSlots";

        setArenaPricing(prev => ({
            ...prev,
            [key]: []
        }));
        toast.success(`Cleared overrides for ${activeDayTab === 'regular' ? 'Regular Days' : activeDayTab === 'friday' ? 'Friday' : 'Saturday'}`);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Clean up regular slots
            const cleanedTimeSlots = (arenaPricing.timeSlots || []).filter(s =>
                ((s.price && s.price !== arenaPricing.defaultPrice && s.price > 0) || (s.regularPrice && s.regularPrice > 0))
            );

            // Clean up Friday slots
            const effFridayDefault = arenaPricing.fridayDefaultPrice || arenaPricing.defaultPrice;
            const cleanedFridaySlots = (arenaPricing.fridayTimeSlots || []).filter(s =>
                ((s.price && s.price !== effFridayDefault && s.price > 0) || (s.regularPrice && s.regularPrice > 0))
            );

            // Clean up Saturday slots
            const effSaturdayDefault = arenaPricing.saturdayDefaultPrice || arenaPricing.defaultPrice;
            const cleanedSaturdaySlots = (arenaPricing.saturdayTimeSlots || []).filter(s =>
                ((s.price && s.price !== effSaturdayDefault && s.price > 0) || (s.regularPrice && s.regularPrice > 0))
            );

            const payload = {
                arenaName: selectedArena,
                defaultPrice: Number(arenaPricing.defaultPrice) || 2000,
                defaultRegularPrice: Number(arenaPricing.defaultRegularPrice) || 2500,
                timeSlots: cleanedTimeSlots,
                fridayDefaultPrice: arenaPricing.fridayDefaultPrice ? Number(arenaPricing.fridayDefaultPrice) : null,
                fridayDefaultRegularPrice: arenaPricing.fridayDefaultRegularPrice ? Number(arenaPricing.fridayDefaultRegularPrice) : null,
                fridayTimeSlots: cleanedFridaySlots,
                saturdayDefaultPrice: arenaPricing.saturdayDefaultPrice ? Number(arenaPricing.saturdayDefaultPrice) : null,
                saturdayDefaultRegularPrice: arenaPricing.saturdayDefaultRegularPrice ? Number(arenaPricing.saturdayDefaultRegularPrice) : null,
                saturdayTimeSlots: cleanedSaturdaySlots
            };

            const res = await fetch("/api/update-price", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(`${selectedArena} all slot prices updated!`);
                fetchPricing();
            } else {
                toast.error(data.message || "Failed to update pricing");
            }
        } catch (err) {
            console.error("Save error:", err);
            toast.error("An error occurred while saving");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loading />;

    // Get current tab's active data
    let currentDefaultValue = "";
    let currentDefaultPlaceholder = arenaPricing.defaultPrice;
    let currentRegularDefaultValue = "";
    let currentRegularDefaultPlaceholder = arenaPricing.defaultRegularPrice || 2500;
    let currentSlots = [];
    let currentEffectiveDefault = arenaPricing.defaultPrice || 2000;
    let currentEffectiveRegularDefault = arenaPricing.defaultRegularPrice || 2500;

    if (activeDayTab === "regular") {
        currentDefaultValue = arenaPricing.defaultPrice ?? "";
        currentDefaultPlaceholder = 2000;
        currentRegularDefaultValue = arenaPricing.defaultRegularPrice ?? "";
        currentRegularDefaultPlaceholder = 2500;
        currentSlots = arenaPricing.timeSlots || [];
        currentEffectiveDefault = arenaPricing.defaultPrice || 2000;
        currentEffectiveRegularDefault = arenaPricing.defaultRegularPrice || 2500;
    } else if (activeDayTab === "friday") {
        currentDefaultValue = arenaPricing.fridayDefaultPrice ?? "";
        currentDefaultPlaceholder = `Same as Regular (৳${arenaPricing.defaultPrice})`;
        currentRegularDefaultValue = arenaPricing.fridayDefaultRegularPrice ?? "";
        currentRegularDefaultPlaceholder = `Same as Regular (৳${arenaPricing.defaultRegularPrice || 2500})`;
        currentSlots = arenaPricing.fridayTimeSlots || [];
        currentEffectiveDefault = arenaPricing.fridayDefaultPrice || arenaPricing.defaultPrice || 2000;
        currentEffectiveRegularDefault = arenaPricing.fridayDefaultRegularPrice || arenaPricing.defaultRegularPrice || 2500;
    } else if (activeDayTab === "saturday") {
        currentDefaultValue = arenaPricing.saturdayDefaultPrice ?? "";
        currentDefaultPlaceholder = `Same as Regular (৳${arenaPricing.defaultPrice})`;
        currentRegularDefaultValue = arenaPricing.saturdayDefaultRegularPrice ?? "";
        currentRegularDefaultPlaceholder = `Same as Regular (৳${arenaPricing.defaultRegularPrice || 2500})`;
        currentSlots = arenaPricing.saturdayTimeSlots || [];
        currentEffectiveDefault = arenaPricing.saturdayDefaultPrice || arenaPricing.defaultPrice || 2000;
        currentEffectiveRegularDefault = arenaPricing.saturdayDefaultRegularPrice || arenaPricing.defaultRegularPrice || 2500;
    }

    return (
        <div className="manage-pricing">
            <h2 className="dashboard__title">Manage Arena Slot Pricing</h2>

            {/* Day Type Tabs */}
            <div className="pricing-day-tabs mt-4">
                <button
                    type="button"
                    className={`pricing-day-tab-btn ${activeDayTab === "regular" ? "active" : ""}`}
                    onClick={() => setActiveDayTab("regular")}
                >
                    <span>🗓️ Regular Days (Sun – Thu)</span>
                    <span className="pricing-day-badge">5 Days</span>
                </button>

                <button
                    type="button"
                    className={`pricing-day-tab-btn ${activeDayTab === "friday" ? "active" : ""}`}
                    onClick={() => setActiveDayTab("friday")}
                >
                    <span>🕌 Friday (শুক্রবার)</span>
                    <span className="pricing-day-badge">Weekend</span>
                </button>

                <button
                    type="button"
                    className={`pricing-day-tab-btn ${activeDayTab === "saturday" ? "active" : ""}`}
                    onClick={() => setActiveDayTab("saturday")}
                >
                    <span>⚽ Saturday (শনিবার)</span>
                    <span className="pricing-day-badge">Weekend</span>
                </button>
            </div>

            <div className="pricing-content">
                <div className="pricing-card">
                    <div className="day-header-meta">
                        <div>
                            <h4>
                                {activeDayTab === "regular" && "Regular Days (Sunday to Thursday) Pricing"}
                                {activeDayTab === "friday" && "Friday (শুক্রবার) Slot Pricing"}
                                {activeDayTab === "saturday" && "Saturday (শনিবার) Slot Pricing"}
                            </h4>
                            <p>
                                {activeDayTab === "regular" && "Baseline prices applied for Sunday, Monday, Tuesday, Wednesday, and Thursday."}
                                {activeDayTab === "friday" && "Custom prices applied automatically when users select any Friday date."}
                                {activeDayTab === "saturday" && "Custom prices applied automatically when users select any Saturday date."}
                            </p>
                        </div>

                        <div className="quick-actions-wrap">
                            {activeDayTab !== "regular" && (
                                <button
                                    type="button"
                                    className="quick-action-btn"
                                    onClick={handleCopyFromRegular}
                                    title="Copy regular weekday prices into this tab"
                                >
                                    📋 Copy from Regular Days
                                </button>
                            )}
                            {currentSlots.length > 0 && (
                                <button
                                    type="button"
                                    className="quick-action-btn"
                                    onClick={handleClearOverrides}
                                    title="Clear all slot price overrides for this tab"
                                >
                                    🔄 Clear Overrides
                                </button>
                            )}
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }} className="mt-3">
                        <div className="form-group">
                            <label>
                                {activeDayTab === "regular" && "Default Active / Offer Price (৳):"}
                                {activeDayTab === "friday" && "Friday Default Offer Price (৳):"}
                                {activeDayTab === "saturday" && "Saturday Default Offer Price (৳):"}
                            </label>
                            <input
                                type="number"
                                className="form-input"
                                value={currentDefaultValue}
                                placeholder={String(currentDefaultPlaceholder)}
                                onChange={(e) => handleDayDefaultPriceChange(e.target.value)}
                            />
                            <small className="form-hint">
                                {activeDayTab === "regular"
                                    ? "Base offer price (the active price users pay)."
                                    : "Default offer price for this day (leave blank to use regular)."}
                            </small>
                        </div>

                        <div className="form-group">
                            <label>
                                {activeDayTab === "regular" && "Default Regular / Strikethrough Price (৳):"}
                                {activeDayTab === "friday" && "Friday Default Regular Price (৳):"}
                                {activeDayTab === "saturday" && "Saturday Default Regular Price (৳):"}
                            </label>
                            <input
                                type="number"
                                className="form-input"
                                value={currentRegularDefaultValue}
                                placeholder={String(currentRegularDefaultPlaceholder)}
                                onChange={(e) => handleDayDefaultRegularPriceChange(e.target.value)}
                            />
                            <small className="form-hint">
                                Original rate shown crossed-out above the offer price (e.g. ৳2,500).
                            </small>
                        </div>
                    </div>

                    <div className="slots-grid">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                            <h4 style={{ margin: 0 }}>
                                {activeDayTab === "regular" && "Weekday Time Slot Overrides"}
                                {activeDayTab === "friday" && "Friday Time Slot Overrides"}
                                {activeDayTab === "saturday" && "Saturday Time Slot Overrides"}
                            </h4>
                            <span style={{ fontSize: "13px", color: "#64748b" }}>
                                Total slots: {TIME_SLOTS.length} | Overrides set: {currentSlots.length}
                            </span>
                        </div>

                        <div className="slots-table-container">
                            <table className="transactions-table">
                                <thead>
                                    <tr>
                                        <th>Time Slot</th>
                                        <th>Regular Price (৳) [Crossed-out]</th>
                                        <th>Offer Price (৳) [Active]</th>
                                        <th>Card Preview</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TIME_SLOTS.map(slot => {
                                        const override = currentSlots.find(s => s.slot === slot);
                                        const hasCustomPrice = override && override.price !== "" && override.price !== null && override.price !== undefined;
                                        const hasCustomRegPrice = override && override.regularPrice !== "" && override.regularPrice !== null && override.regularPrice !== undefined;

                                        const shiftRegDefault = DEFAULT_SLOT_REGULAR_PRICES[slot] || currentEffectiveRegularDefault;
                                        const effectiveRegPrice = hasCustomRegPrice ? override.regularPrice : shiftRegDefault;
                                        const effectivePrice = hasCustomPrice ? override.price : currentEffectiveDefault;

                                        return (
                                            <tr key={slot}>
                                                <td style={{ fontWeight: 500 }}>{slot}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder={String(shiftRegDefault)}
                                                        value={hasCustomRegPrice ? override.regularPrice : ""}
                                                        onChange={(e) => handleSlotRegularPriceChange(slot, e.target.value)}
                                                        className="slot-price-input"
                                                        style={{ maxWidth: "115px" }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder={String(currentEffectiveDefault)}
                                                        value={hasCustomPrice ? override.price : ""}
                                                        onChange={(e) => handleSlotPriceChange(slot, e.target.value)}
                                                        className="slot-price-input"
                                                        style={{ maxWidth: "115px" }}
                                                    />
                                                </td>
                                                <td style={{ textAlign: "right", paddingRight: "16px" }}>
                                                    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end", lineHeight: 1.2 }}>
                                                        {effectiveRegPrice > effectivePrice && (
                                                            <span style={{ fontSize: "11.5px", color: "#94a3b8", textDecoration: "line-through" }}>
                                                                ৳{Number(effectiveRegPrice).toLocaleString()}
                                                            </span>
                                                        )}
                                                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#0096c7" }}>
                                                            ৳{Number(effectivePrice).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {hasCustomPrice || hasCustomRegPrice ? (
                                                        <span className="status-badge override">Custom</span>
                                                    ) : (
                                                        <span className={`status-badge ${activeDayTab === 'friday' ? 'friday' : activeDayTab === 'saturday' ? 'saturday' : 'default'}`}>
                                                            Default
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {(hasCustomPrice || hasCustomRegPrice) && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                handleSlotPriceChange(slot, "");
                                                                handleSlotRegularPriceChange(slot, "");
                                                            }}
                                                            style={{
                                                                background: "none",
                                                                border: "none",
                                                                color: "#ef4444",
                                                                cursor: "pointer",
                                                                fontSize: "12px",
                                                                fontWeight: 600
                                                            }}
                                                            title="Reset to default"
                                                        >
                                                            ✕ Reset
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="actions mt-4">
                        <button
                            type="button"
                            className="tertiary-button"
                            onClick={handleSave}
                            disabled={saving}
                            style={{ minWidth: "220px" }}
                        >
                            {saving ? "Saving All Pricing..." : "💾 Save All Pricing Configurations"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageSlotPrice;
