    document.addEventListener('DOMContentLoaded', () => {
    // Preisstruktur
    const priceConfig = {
        'Fulltune': {
            prices: [100000, 100000, 100000, 100000],
            selector: '#fulltune'
        },
        'Primärfarbe': {
            prices: [60000, 75000, 48000, 405000],
            selector: '#primaerfarbe'
        },
        'Sekundärfarbe': {
            prices: [45000, 60000, 27000, 300000],
            selector: '#sekundaerfarbe'
        },
        'Perleffekt': {
            prices: [30000, 45000, 24000, 180000],
            selector: '#perleffekt'
        },
        'Nummernschildfarbe': {
            prices: [36000, 30000, 30000, 0],
            selector: '#nummernschild'
        },
        'Custom-Kennzeichen': {
            prices: [3000000, 3000000, 3000000, 3000000],
            selector: '#customkennzeichen'
        },
        'Reifenfarbe': {
            prices: [27000, 30000, 30000, 180000],
            selector: '#reifenfarbe'
        },
        'Reifenqualm': {
            prices: [27000, 30000, 24000, 0],
            selector: '#reifenqualm'
        },
        'Xenon Scheinwerfer': {
            prices: [30000, 30000, 30000, 180000],
            selector: '#xenon'
        },
        'Unterboden': {
            prices: [27000, 33000, 24000, 180000],
            selector: '#unterboden'
        },
        'Quarterdeck': {
            prices: [30000, 30000, 27000, 0],
            selector: '#quarterdeck'
        },
        'felgen': {
            prices: [15000, 15000, 15000, 15000],
            selector: '#felgen'
        },
        'headlights': {
            prices: [
                [0, 0, 0, 0],
                [1000000, 1000000, 1000000, 1000000],
                [500000, 500000, 500000, 500000]
            ],
            selector: '#headlights',
            isDropdown: true
        },
        'Fahrzeugteile': {
            prices: [54000, 63000, 45000, 45000], // Preise pro Stück
            selector: '#fahrzeugteile-anzahl'
        }
    };

    const anzahlElement = document.getElementById('fahrzeugteile-anzahl');
    const plusBtn = document.getElementById('fahrzeugteile-plus');
    const minusBtn = document.getElementById('fahrzeugteile-minus');

    let anzahl = 0;

    function updateCounter() {
        anzahlElement.textContent = anzahl;
        minusBtn.disabled = anzahl === 0;
        updatePrice();
    }

    plusBtn.addEventListener('click', () => {
        anzahl++;
        updateCounter();
    });

    minusBtn.addEventListener('click', () => {
        if (anzahl > 0) anzahl--;
        updateCounter();
    });

    // Gutschein-Regeln – beide Gutscheine sollen exakt gleich behandelt werden
    const voucherRules = {
        'gutschein1': {
            '1': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 0
                }
            },
            '2': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 1
                }
            },
            '3': {
                disable: {
                    elements: ['#primaerfarbe', '#sekundaerfarbe', '#perleffekt'],
                    condition: () => true
                }
            },
            '7': {
                disable: {
                    elements: ['#nummernschild', '#customkennzeichen'],
                    condition: () => true
                }
            },
            '5': {
                disable: {
                    elements: ['#reifenfarbe', '#reifenqualm','#fenstertoenung'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#felgen');
                    if (felgen) felgen.value = '0';
                }
            },
            '6': {
                disable: {
                    elements: ['#hupe'],
                    condition: () => true
                }
            },
            '4': {
                disable: {
                    elements: ['#unterboden'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#headlights');
                    if (headlights) headlights.value = '0';
                }
            }
        },
        'gutschein2': {
            '1': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 0
                }
            },
            '2': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 1
                }
            },
            '3': {
                disable: {
                    elements: ['#primaerfarbe', '#sekundaerfarbe', '#perleffekt'],
                    condition: () => true
                }
            },
            '7': {
                disable: {
                    elements: ['#nummernschild', '#customkennzeichen'],
                    condition: () => true
                }
            },
            '5': {
                disable: {
                    elements: ['#reifenfarbe', '#reifenqualm','#fenstertoenung'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#felgen');
                    if (felgen) felgen.value = '0';
                }
            },
            '6': {
                disable: {
                    elements: ['#hupe'],
                    condition: () => true
                }
            },
            '4': {
                disable: {
                    elements: ['#unterboden'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#headlights');
                    if (headlights) headlights.value = '0';
                }
            }
        }
    };

    const zuordnungSelectElement = document.getElementById('zuordnungSelect');
    if (zuordnungSelectElement) {
        const infoBox = document.getElementById('zuordnungInfo');
        const optionInfo = {
            'bennys': 'Primär: <br> Sekundär:  <br> Perleffekt: <br> Reifenqualm: - <br> Unterboden: -',
            'fib vip': 'Codewort: Döner mit allem <br> Es wird nicht nach dem Ausweis gefragt! <br> Um die DN festzustellen Frage einfach:"Wie viel Geld hast du dabei?" <br> Alles kostenlos',
            'md vip': 'Primär: <br> Sekundär: <br> Perlerffekt: <br> Keine Troll Felgen und keine Fenstertönung <br> Dienstfahrzeuge kostenlos',
            'md vip spezial unit': 'Primär: <br> Sekundär: <br> Perlerffekt: <br> Dienstfahrzeuge kostenlos',
            'pd vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos',
            'tmf vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos',
            'pd cid vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos,', 
            'pd gtf vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos',
            'pd jugular vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos', 
            'pd jugulargtf vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos', 
            'pd s.p.f.u vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos', 
            'pd swat vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos',
            'pd unmarked vip': 'Primärfarbe:  <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos', 
            'tmf vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Info: Dienstfahrzeuge kostenlos',  
            'tmf unmarked vip': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br> Dienstfahrzeuge kostenlos',
            'unicorn': 'Primärfarbe: <br> Sekundärfarbe:  <br> Perleffekt:  <br> Reifenqualm: ',   
            'blood rose mc': 'Primär: <br> Sekundär: <br> Perleffekt: ',
            'onepiece': 'Primär: <br> Sekundär: <br> Perleffekt: ',
            'stryx block 069': 'Primär: <br> Sekundär: <br> Perleffekt: ',
            '666': 'Primär: <br> Sekundär: <br> Perleffekt: ',
            'district 67': 'Primär: <br> Sekundär: <br> Perleffekt: ',
            'k-town': 'Primär: <br> Sekundär: <br> Perleffekt: ',
            'zivi vip2': 'Info: Bekommen 40% auf alle Fahrzeuge'

            
            // Hier kannst du weitere Zuordnungen und Infos hinzufügen
        };

        function updateZuordnungInfo() {
            const selectedValue = zuordnungSelectElement.value.toLowerCase();
            if (optionInfo[selectedValue]) {
                infoBox.innerHTML = optionInfo[selectedValue];
                infoBox.style.display = 'block';
            } else {
                infoBox.style.display = 'none';
            }
        }

        // Bei Änderung des Dropdowns Info-Box aktualisieren und Preis neu berechnen
        zuordnungSelectElement.addEventListener('change', () => {
            updateZuordnungInfo();
            updatePrice();
        });

        // Initial beim Laden der Seite
        updateZuordnungInfo();
    }

    // DOM-Elemente
    const mainOptions = document.querySelectorAll('.main-option');
    const priceDisplay = document.getElementById('total-price');

    // Gutschein-Handler: beide Voucher-Dropdowns werden hier verarbeitet
    function handleVoucherChanges() {
        const voucherSelects = [
            document.getElementById('gutschein1'),
            document.getElementById('gutschein2')
        ];
        const mainIndex = [...mainOptions].findIndex(opt => opt.checked);
        
        // Rücksetzen aller Elemente, die von beiden Gutscheinen beeinflusst werden
        Object.values(voucherRules.gutschein1).forEach(rule => {
            rule.disable.elements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.disabled = false;
                    if (element.type === 'checkbox') {
                        element.checked = element.checked && !element.disabled;
                    }
                }
            });
        });
        
        // Verarbeitung beider Voucher-Felder
        voucherSelects.forEach((voucherSelect, index) => {
            if (!voucherSelect) return;
            const selectedOption = voucherSelect.value;
            // Überspringen, falls kein Gutschein gewählt wurde
            if (selectedOption === "0" || selectedOption.toLowerCase() === "keiner") return;
            
            // Wähle den passenden Regelsatz: Gutschein 1 oder Gutschein 2
            const rules = index === 0 ? voucherRules.gutschein1 : voucherRules.gutschein2;
            const rule = rules[selectedOption];
            if (rule) {
                if (rule.disable.condition(mainIndex)) {
                    rule.disable.elements.forEach(selector => {
                        const element = document.querySelector(selector);
                        if (element) {
                            element.disabled = true;
                            if (element.type === 'checkbox') {
                                element.checked = false;
                            }
                        }
                    });
                }
                if (rule.additionalActions) {
                    rule.additionalActions();
                }
            }
        });
    }

    // Preisberechnung
    function updatePrice() {
        let total = 0;
        const mainIndex = [...mainOptions].findIndex(opt => opt.checked);
        if (mainIndex === -1) return;

        Object.entries(priceConfig).forEach(([name, config]) => {
            const element = document.querySelector(config.selector);
            if (!element || element.disabled) return;

            if (config.isDropdown) {
                // Korrekte Dropdown-Behandlung
                const selectedValue = parseInt(element.value);
                if (!isNaN(selectedValue) && selectedValue >= 0) {
                    const priceArray = config.prices[selectedValue] || [];
                    total += priceArray[mainIndex] || 0;
                }
            } else {
                // Checkbox-Behandlung
                if (element.checked) {
                    total += config.prices[mainIndex] || 0;
                }
            }
        });

        const fahrzeugteileConfig = priceConfig['Fahrzeugteile'];
        const currentAnzahl = parseInt(document.getElementById('fahrzeugteile-anzahl').textContent);
        total += currentAnzahl * fahrzeugteileConfig.prices[mainIndex];

        // Rabatt-Optionen:
        const zuordnungSelect = document.getElementById('zuordnungSelect');
        if (zuordnungSelect) {
            const optionVal = zuordnungSelect.value.toLowerCase();
            console.log("Debug: Dropdown 'zuordnungSelect' value:", optionVal);
            if (optionVal === 'bennys') {
                total *= 0.5;
            } else if (optionVal.includes('vip2')) {
                total *= 0.6
            } else if (optionVal.includes('vip')) {
                // Wenn Fahrzeugtyp bereits gewählt, entsprechend 30 % (privatauto) oder 40 % (frakdienstauto)
                const carType = document.querySelector('input[name="contractType"]:checked');
                if (carType) {
                    console.log("Debug: Radiobutton 'contractType' selected:", carType.value);
                    if (carType.value === 'privatauto') { // Privatauto
                        total *= 0.7;
                    } else if (carType.value === 'frakdienstauto') { // Frak/Dienstauto
                        total *= 0.6;
                    }
                } else {
                    console.log("Debug: Kein Fahrzeugtyp ausgewählt, defaulting to 30% discount");
                    total *= 0.7;
                }
            }
        }
        
        priceDisplay.textContent = new Intl.NumberFormat('de-DE', { useGrouping: false }).format(total);

    }

    // Event-Listener für Main Options mit Reset der Gruppen
    mainOptions.forEach(option => {
        option.addEventListener('change', () => {
            anzahl = 0;
            updateCounter();

            // Spezielles Reset für option-items, falls vorhanden
            document.querySelectorAll('.option-items input, .option-items select').forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
            // Reset der Gruppen: option-items, input-group, gutschein-group, felgen-group, headlights-group
            ['option-item', 'input-group', 'gutschein-group', 'felgen-group', 'headlights-group'].forEach(className => {
                document.querySelectorAll('.' + className).forEach(group => {
                    group.querySelectorAll('input, select').forEach(input => {
                        if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = false;
                        } else {
                            input.value = '';
                        }
                    });
                });
            });
            const infoBox = document.getElementById('zuordnungInfo');
            if (infoBox) {
                infoBox.style.display = 'none';
 // Oder falls du eine Standardnachricht setzen willst: infoBox.innerHTML = 'Wähle eine Option';
            }

            const zuordnungSelect = document.getElementById('zuordnungSelect');
            if (zuordnungSelect) {
                zuordnungSelect.value = 'zivilist';  // Hier den Wert explizit auf 'zivilist' setzen
                // Optional: Event auslösen, damit die Preisberechnung mit dem neuen Wert funktioniert
                $(zuordnungSelect).trigger('change');
            }

            handleVoucherChanges();
            updatePrice();
        });
    });

    Object.values(priceConfig).forEach(config => {
        const element = document.querySelector(config.selector);
        if (element) {
            if (config.isDropdown) {
                element.addEventListener('change', () => {
                    handleVoucherChanges();
                    updatePrice();
                });
            } else {
                element.addEventListener('change', updatePrice);
            }
        }
    });

    document.querySelectorAll('.check-box').forEach(element => {
        element.addEventListener('change', updatePrice);
    });

    // Event-Listener für beide Gutschein-Dropdowns hinzufügen
    const gutschein1 = document.getElementById('gutschein1');
    if (gutschein1) {
        gutschein1.addEventListener('change', () => {
            handleVoucherChanges();
            updatePrice();
        });
    }
    const gutschein2 = document.getElementById('gutschein2');
    if (gutschein2) {
        gutschein2.addEventListener('change', () => {
            handleVoucherChanges();
            updatePrice();
        });
    }

    // Event-Listener für das Dropdown "zuordnungSelect"
    const zuordnungSelect = document.getElementById('zuordnungSelect');
    if (zuordnungSelect) {
        zuordnungSelect.addEventListener('change', updatePrice);
    }
    
    // *** WICHTIG: Event-Listener für die Radiobuttons des Fahrzeugtyps ***
    document.querySelectorAll('input[name="contractType"]').forEach(input => {
        input.addEventListener('change', updatePrice);
    });

    // Initialisierung
    handleVoucherChanges();
    updatePrice();
});

// Hauptoptionen-Handler
function onlyOne(checkbox) {
    const checkboxes = document.querySelectorAll('.main-option');
    checkboxes.forEach(item => {
        if (item !== checkbox) item.checked = false;
    });
}

    // Überprüfen und anpassen des Platzhalters beim Öffnen des Dropdowns



document.getElementById("sendenButton").addEventListener("click", () => {

    const workerNumber = localStorage.getItem("dienstnummer") || "Unbekannt";
    const customerName = document.getElementById("kundenname").value;
    let finalPrice = document.getElementById("total-price").textContent;

    const headlightsValue = document.getElementById("headlights").value;
    if (headlightsValue === "1") {
        finalPrice += " (inkl. Headlights)";
    } else if (headlightsValue === "2") {
        finalPrice += " (inkl. Headlightsfarbe)";
    }

    if (document.getElementById("customkennzeichen").checked) {
        finalPrice += " (inkl. Kennzeichen)";
    }

    const zuordnungSelect = $('#zuordnungSelect');
    const zuordnungText = zuordnungSelect.find("option:selected").text();
    const filteredZuordnungText = zuordnungText.replace(/[^\p{L}\s]/gu, '');

    const dienstnummerValue = document.getElementById("dienstnummerkunde").value;
    const dienstnummerText = dienstnummerValue
        ? ` -- Dienstnummer: ${dienstnummerValue}`
        : "";

    const message = `${workerNumber} - ${customerName} | ${finalPrice} | ${filteredZuordnungText}${dienstnummerText}`;

    const webhooks = {
        "mitarbeiter_01.html": "https://discordapp.com/api/webhooks/1495787692833767464/5CZhZ6QgSTZnEcF53RLEOWV-HwWmbHHBVDWaYsl0oKbE8x_Z2SF7pAqyJAZEqO4P6p66",
        "mitarbeiter_02.html": "https://discordapp.com/api/webhooks/1495787737482002563/GTYU3l7JEa6ljGpXRuuueX_JnYY4bXzIdsPPYLuJwIdEMBigOAxUq0XgRzaIjyuJL4OC",
        "mitarbeiter_03.html": "https://discordapp.com/api/webhooks/1495787770981912594/3m69fdfrEVrSiKYhwasFH7ziE2mUG6bD4CdFMfEwp8DFodJgrxJfKu2cqLlQgyBlUYMV",
        "mitarbeiter_04.html": "https://discordapp.com/api/webhooks/1495787803953336402/jtZnv1_D0kAHudxQ_PyA-SvtmsdfuwBzcHufD6fK8Hq5NggNcuI6xWpkqCP5SZlg_ZUa"
        "mitarbeiter_05.html": "https://discordapp.com/api/webhooks/1495787848757154064/gvpJqACWtmE3TjduQgnolgCC6RulJ4tAxkrKbMK4hMLWzEV9h5qy32vD-HcWjZyVFl1e"
        "mitarbeiter_06.html": "https://discordapp.com/api/webhooks/1495787874573090917/9RCvUydTeyG9Q1L8nxfdSnoKTy0liBXDrt8F9KOqFZ_GJYi7r3aMUlKwQJtenWDKnucl"
        "mitarbeiter_07.html": "https://discordapp.com/api/webhooks/1495877685887504556/Itg4b-KQCOGXWjq_og4PEnywS50rIVTPGCmWzSAiZYVXr-__4CG-jx1bSjdqvb0dv88_"
        "mitarbeiter_08.html": "https://discordapp.com/api/webhooks/1495877764002353234/nIZmxQXLPmmF1W2XyDsGmIcX5mX-64hLvX3eNKUbEscpiUkOIdhkhjj4LaNgjPaygxiA"
        "mitarbeiter_09.html": "https://discordapp.com/api/webhooks/1495877845111537764/mKRxgFi3AjcJwSYOOFA_aPiKhjTvIJIF2ar3ro6oU8_Wjg-VZXQhfaihCqxT7QGEQjap"
        "mitarbeiter_10.html": "https://discordapp.com/api/webhooks/1495878060246040760/Mo46VBCb-kG7-3-wef3ZE62FYVr3ZuC0CIOD94xi1cvacI_g6ba6Y9QkQeOjPlpa4avK"
        "mitarbeiter_11.html": "https://discordapp.com/api/webhooks/1495877931946217532/v7w7CcXZR0TGtq0zgI_uK79qYTTeET8zrCpYydMt-sdZAI8JSFxbXPdpYzhT-m67p-i6"
        "mitarbeiter_12.html": "https://discordapp.com/api/webhooks/1495878172800057354/Y015a0nGGNbx_p8IqsEM_nbx9wfBxqU4k4y0mjzx-7YimOE_Xjr_wXVIgGXCYmNyBTo6"
        "mitarbeiter_13.html": "https://discordapp.com/api/webhooks/1495878376311754862/Um8yn7yZdUl9BtVxTCQZIKMZKdv2PEUQRU6lt7ga66PcScnzOzmRc1p5x2BcsUwRCc3x"
        "mitarbeiter_14.html": "https://discordapp.com/api/webhooks/1495878447237566614/IuisDbyrX3lvR_ypjKLp6ZryKJJhzPi_e_TL_Uy-5h7T6RPKzuWqlJkfaLwt9I9ATWcX"
        "mitarbeiter_15.html": "https://discordapp.com/api/webhooks/1495878568033386598/n1ycsqPuUFyPAd_AVYVRA-JUS0VvPMPDmFoKLFM6uRv9mVXXw1q7ZFw8xO_YvX0U6dlL"
        "mitarbeiter_16.html": "https://discordapp.com/api/webhooks/1495878844471836792/RgeeDC_5gdsEbr3C6umIetPUbW0iYUw_RtnRBtSV-clArrDSWS1Z7AUzLy1q4029iux9"
        "mitarbeiter_17.html": "https://discordapp.com/api/webhooks/1495878899421286511/UHgu9rR_xD9HhU5248JCrWM3_zgYYavfQkbjGeCZxddZPuUY-mftMeh-tbQ9pAcMx48d"
        "mitarbeiter_18.html": "https://discordapp.com/api/webhooks/1495878973366861895/x5vrZCEPS9ccXL0JDsQGkVw-JjWkgSz-YQ79ewMRK5GJosO2kWwh2Yn6vOm_o3lXnGpf"
        "mitarbeiter_19.html": "https://discordapp.com/api/webhooks/1495880576903942284/WEjiUTqjgnCbJCmyXqIg7y8zN4iOUGM51lp2Dc6N8KKF6ylvxfBiGGrf5_HvVhJYWoSd"
        "mitarbeiter_20.html": "https://discordapp.com/api/webhooks/1495880672647057631/FlM_LCnhVU3J8JvQBSDblExMBVfAQmWRjbb3_2_1PFj1sp_dyE6r0pJmBpCHgsOu00sl"
        "mitarbeiter_21.html": "https://discordapp.com/api/webhooks/1495880737839255662/uiskS-XlMVHa26kZs32DgBakaZsfhbgMMil69m-mlMjgjhpJaQwQmsZrANpLYOJZR8C8"
        "mitarbeiter_22.html": "https://discordapp.com/api/webhooks/1495881145823399986/Mq3hZpYq4XHHEDLhvjBxETpnNkzC5Ttzd-Y1O89hjZeJsZ_dX60tUxKok6V79WXtpkh9"
        "mitarbeiter_23.html": "https://discordapp.com/api/webhooks/1495881217936068758/72KFDZB0VrgOKzIYTtjmrGWuZAiNzVssUejzFwAqp8u0QdYekKEBxv9VFTUNsG_TfZM-"
        "mitarbeiter_24.html": "https://discordapp.com/api/webhooks/1495881406189015132/Pr5TrVkPh6nBb7ZcbQhYUSOilCORB-kxBE4v3YGg7q9NA2uwbBUESzffuRL5H_1zh4LS"
        "mitarbeiter_25.html": "https://discordapp.com/api/webhooks/1495881446794199101/BAZ4kWYe4nWj5CtxtVwxKSIVEzFx0uenzkxCjtunm_gu5kCl82CmZPeClWCILvfNXIoc"
        "mitarbeiter_26.html": "https://discordapp.com/api/webhooks/1495882112501420063/FNsE8SPzKZ66ZUVKWDMHUhb8l4d_XdJLeURCSTjgf8oxeeaLaVYE4wecyODeRj7B7kgh"
        "mitarbeiter_27.html": "https://discordapp.com/api/webhooks/1495882245754327070/jB8CQg_X6Aw_b09Q5eWEwIPFHTiDEcqZoXEQ9MF05oT4D0b2VuhOOGNRHS-a7Bojc74r"
        "mitarbeiter_28.html": "WEBHOOK_28"
        "mitarbeiter_29.html": "WEBHOOK_29"
        "mitarbeiter_30.html": "WEBHOOK_30"
        "mitarbeiter_31.html": "WEBHOOK_31"
        "mitarbeiter_32.html": "WEBHOOK_32"
        "mitarbeiter_33.html": "WEBHOOK_33"
        "mitarbeiter_34.html": "WEBHOOK_34"
        "mitarbeiter_35.html": "WEBHOOK_35"
        "mitarbeiter_36.html": "WEBHOOK_36"
        "mitarbeiter_37.html": "WEBHOOK_37"
        "mitarbeiter_38.html": "WEBHOOK_38"
        "mitarbeiter_39.html": "WEBHOOK_39"
        "mitarbeiter_40.html": "WEBHOOK_40"
        "mitarbeiter_41.html": "WEBHOOK_41"
        "mitarbeiter_42.html": "WEBHOOK_42"
        "mitarbeiter_43.html": "WEBHOOK_43"
        "mitarbeiter_44.html": "WEBHOOK_44"
        "mitarbeiter_45.html": "WEBHOOK_45"
        "mitarbeiter_46.html": "WEBHOOK_46"
        "mitarbeiter_47.html": "WEBHOOK_47"
        "mitarbeiter_48.html": "WEBHOOK_48"
        "mitarbeiter_49.html": "WEBHOOK_49"
        "mitarbeiter_50.html": "WEBHOOK_50"
        "mitarbeiter_51.html": "WEBHOOK_51"
        "mitarbeiter_52.html": "WEBHOOK_52"
        "mitarbeiter_53.html": "WEBHOOK_53"
        "mitarbeiter_54.html": "WEBHOOK_54"
        "mitarbeiter_55.html": "WEBHOOK_55"
        "mitarbeiter_56.html": "WEBHOOK_56"
        "mitarbeiter_57.html": "WEBHOOK_57"
        "mitarbeiter_58.html": "WEBHOOK_58"
        "mitarbeiter_59.html": "WEBHOOK_59"
        "mitarbeiter_60.html": "WEBHOOK_60"
        "mitarbeiter_61.html": "WEBHOOK_61"
        "mitarbeiter_62.html": "WEBHOOK_62"
        "mitarbeiter_63.html": "WEBHOOK_63"
        "mitarbeiter_64.html": "WEBHOOK_64"
        "mitarbeiter_65.html": "WEBHOOK_65"
        "mitarbeiter_66.html": "WEBHOOK_66"
        "mitarbeiter_67.html": "WEBHOOK_67"
        "mitarbeiter_68.html": "WEBHOOK_68"
        "mitarbeiter_69.html": "WEBHOOK_69"
        "mitarbeiter_70.html": "WEBHOOK_70"
        "mitarbeiter_200.html": "WEBHOOK_71"
        "mitarbeiter_201.html": "WEBHOOK_72"
        "mitarbeiter_202.html": "WEBHOOK_73"
        "mitarbeiter_203.html": "WEBHOOK_73"
        "mitarbeiter_204.html": "WEBHOOK_73"
        "mitarbeiter_205.html": "WEBHOOK_73"
        "mitarbeiter_206.html": "WEBHOOK_73"
        "mitarbeiter_207.html": "WEBHOOK_73"
        "mitarbeiter_208.html": "WEBHOOK_73"
        "mitarbeiter_209.html": "WEBHOOK_73"
        "mitarbeiter_210.html": "WEBHOOK_73"
        "mitarbeiter_211.html": "WEBHOOK_73"
        "mitarbeiter_212.html": "WEBHOOK_73"
        "mitarbeiter_213.html": "WEBHOOK_73"
        "mitarbeiter_214.html": "WEBHOOK_73"
        "mitarbeiter_215.html": "WEBHOOK_73"
        "mitarbeiter_216.html": "WEBHOOK_73"
        "mitarbeiter_217.html": "WEBHOOK_73"
        "mitarbeiter_218.html": "WEBHOOK_73"
        "mitarbeiter_219.html": "WEBHOOK_73"
        "mitarbeiter_220.html": "WEBHOOK_73"
        
    };

    const currentPage = window.location.pathname.split("/").pop();
    const webhookURL = webhooks[currentPage];

    if (!webhookURL) {
        console.error("Kein Webhook für diese Seite gefunden!");
        return;
    }

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: message
        })
    })
    .then(response => response.text())
    .then(data => console.log("Erfolg:", data))
    .catch(error => console.error("Fehler:", error));

}); // <-- WICHTIG! Event hier sauber schließen



window.onload = function () {
    const dienstnummer = localStorage.getItem("dienstnummer");

    if (dienstnummer) {
        document.querySelector('.dienstnummer-info').innerHTML =
            `Dienstnummer des Arbeiters: ${dienstnummer}`;
    }
};
