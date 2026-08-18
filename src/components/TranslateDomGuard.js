"use client";

import { useEffect } from "react";

export default function TranslateDomGuard() {
  useEffect(() => {
    if (typeof Node === "undefined" || Node.prototype.__patchedForTranslate) return;

    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) {
        if (child.parentNode) {
          return child.parentNode.removeChild(child);
        }
        return child;
      }
      return originalRemoveChild.call(this, child);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        return this.appendChild(newNode);
      }
      return originalInsertBefore.call(this, newNode, referenceNode);
    };

    Node.prototype.__patchedForTranslate = true;
  }, []);

  return null;
}