"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/layout";
import { contactInfo } from "@/lib/constants";

export function ContactSection() {
  const { expandedSections, toggleSectionExpanded } = useStore();
  const isExpanded = expandedSections["contact"] ?? false;
  const [copied, setCopied] = useState(false);
  return (
    <div
      id="contact"
      className="font-mono max-w-6xl mx-auto px-4 md:px-12 mb-24"
    >
      <SectionHeader
        title="Let's Talk"
        isExpanded={isExpanded}
        onToggle={() => toggleSectionExpanded("contact")}
      />
      <div className={`grid transition-[grid-template-rows] duration-300 ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
            <div className="glass mt-4 p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-32 bg-foreground/5 blur-3xl rounded-full group-hover:bg-foreground/10 transition-colors duration-700" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-black mb-4">Get in touch</h3>
                  <p className="text-sm opacity-60 leading-relaxed mb-6">
                    Open to discussing interesting problems, collaborations,
                    and good ideas. Coffee works too.
                  </p>
                  <div className="space-y-2">
                    {contactInfo.map((info, i) => (
                      <div
                        key={i}
                        className="text-xs font-mono opacity-50 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          const val = info.split(": ")[1];
                          if (val) {
                            navigator.clipboard.writeText(val);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }
                        }}
                      >
                        <span className="text-foreground/30">
                          {info.split(": ")[0]}:
                        </span>
                        <span className="underline decoration-foreground/20 underline-offset-4">
                          {info.split(": ")[1]}
                        </span>
                        {copied && (
                          <span className="text-[10px] text-green-500 font-bold ml-2">
                            COPIED
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-foreground/5 rounded-xl p-4 border border-foreground/10">
                    <pre className="text-[10px] md:text-xs font-mono overflow-x-auto">
                      <code>
                        <span className="text-purple-400">const</span> message ={" "}
                        {"{"}
                        {"\n"}
                        {"  "}role:{" "}
                        <span className="text-green-400">
                          &quot;SDE @ Trellix&quot;
                        </span>
                        ,{"\n"}
                        {"  "}openToCollabs:{" "}
                        <span className="text-orange-400">true</span>,{"\n"}
                        {"  "}coffee:{" "}
                        <span className="text-orange-400">true</span>
                        {"\n"}
                        {"}"};
                      </code>
                    </pre>
                  </div>
                  <button
                    onClick={() => {
                      const email = contactInfo[0]?.split(": ")[1];
                      if (email) navigator.clipboard.writeText(email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="mt-4 w-full py-3 bg-foreground text-background font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? "Address Copied!" : "Copy Email Address"}
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
