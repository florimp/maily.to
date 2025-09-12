import React from 'react';
import type { Editor } from '@tiptap/core';

// Eine Liste der Schriftgrößen, die du anbieten möchtest.
// Du kannst diese Liste nach Belieben anpassen.
const FONT_SIZES = ['12px', '14px', '16px', '18px', '24px', '30px', '36px'];

interface FontSizeSelectorProps {
    editor: Editor | null;
}

export const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({
                                                                      editor,
                                                                  }) => {
    if (!editor) {
        return null;
    }

    // Findet die aktuell aktive Schriftgröße in der Auswahl.
    // Wenn keine spezifische Größe aktiv ist, wird ein Standardwert angezeigt.
    const currentSize =
        FONT_SIZES.find((size) =>
            editor.isActive('textStyle', { fontSize: size })
        ) || '16px'; // '16px' ist der Standard-Fallback.

    // Diese Funktion wird aufgerufen, wenn der Benutzer eine neue Größe auswählt.
    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = event.target.value;
        // Führt den TipTap-Befehl aus, um die Schriftgröße auf den markierten Text anzuwenden.
        editor.chain().focus().setFontSize(newSize).run();
    };

    return (
        <select
            value={currentSize}
            onChange={handleSizeChange}
            className="mly:ml-2 mly:rounded mly:border mly:border-gray-300 mly:px-2 mly:py-1 mly:text-sm"
            aria-label="Font size"
        >
            {FONT_SIZES.map((size) => (
                <option key={size} value={size}>
                    {size}
                </option>
            ))}
        </select>
    );
};