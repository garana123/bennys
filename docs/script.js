    document.addEventListener('DOMContentLoaded', () => {
    // Preisstruktur
    const priceConfig = {
        'Bremsen': {
            prices: [210000, 270000, 240000, 600000],
            selector: '#bremsen'
        },
        'Federung': {
            prices: [210000, 270000, 240000, 600000],
            selector: '#federung'

        },
        'Getriebe': {
            prices: [270000, 420000, 300000, 600000],
            selector: '#getriebe'
        },
        'Motor': {
            prices: [300000, 480000, 300000, 600000],
            selector: '#motor'
        },
        'Turbo': {
            prices: [300000, 450000, 240000, 1000000],
            selector: '#turbo'
        },
        'Fulltune': {
            prices: [800000, 1200000, 600000, 1000000],
            selector: '#fulltune'
        },
        'Panzerung': {
            prices: [300000, 500000, 240000, 600000],
            selector: '#panzerung'
        },
        'Fenstertönung': {
            prices: [30000, 39000, 27000, 120000],
            selector: '#fenstertoenung'
        },
        'Sticker': {
            prices: [30000, 36000, 30000, 180000],
            selector: '#sticker'
        },
        'Hupen': {
            prices: [27000, 28500, 27000, 0],
            selector: '#hupe'
        },
        'Interieur': {
            prices: [72000, 45000, 30000, 0],
            selector: '#interieur'
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
            prices: [
                [0, 0, 0, 0],
                [25000, 25000, 25000, 25000],
                [75000, 75000, 75000, 75000]
            ],
            selector: '#felgen',
            isDropdown: true
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
            'bennys': 'Primär: Mystisches Violet <br> Sekundär: Mystisches Violet <br> Perleffekt: Amethyst <br> Reifenqualm: - <br> Unterboden: -',
            'fib vip': 'Codewort: Döner mit allem <br> Es wird nicht nach dem Ausweis gefragt! (erst ab DN 90) (Ausnahme: DN 99 & 304) <br> Um die DN festzustellen Frage einfach:"Wie viele Euros brauchst du?" <br> Die Ränge Recruit, Trainee und Junior Agent tunen Dienstfahrzeuge kostenlos',
            'md vip': 'Primär: #ffffff <br> Sekundär: #ffffff <br> Perlerffekt: Nichts (Schwarz) <br> Keine Troll Felgen und keine Fenstertönung <br> Die Ränge Praktikant, Sanitäter, Allgemein Mediziner und Feld-Sanitäter tunen Dienstfahrzeuge kostenlos',
            'md vip spezial unit': 'Primär: HEX: #008c7d <br> Sekundär: HEX: #008c7d <br> Perlerffekt: 10. Reihe das letzte (das weiß ähnliche) <br> Die Ränge Praktikant, Sanitäter, Allgemein Mediziner und Feld-Sanitäter tunen Dienstfahrzeuge kostenlos',
            'pd vip': 'Primärfarbe: Aluminium Grau <br> Sekundärfarbe: ./. <br> Perleffekt: Alabaster Weiß <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos',
            'sd': 'Primärfarbe: Creme (Weiß) <br> Sekundärfarbe: - <br> Perleffekt: Alabaster Weiß <br> Info: Die Ränge Cadet, Junior Deputy und Deputy tunen Dienstfahrzeuge kostenlos',
            'us marshals vip': 'Primärfarbe: Jagt Grün <br> Sekundärfarbe: Jagt Grün <br> Perleffekt: Jagt Grün <br> Info: Die Ränge Praktikant, Deputy Marshal 1, Deputy Marshal 2 und Deputy Marshal 3 tunen Dienstfahrzeuge kostenlos',
            'ice company vip': 'Primärfarbe: Diamantblau <br> Sekundärfarbe: Kaugummi Blau <br> Perleffekt: Alabaster weiß <br> Reifenqualm: ./.',
            'la mano azura mc': 'Primärfarbe: Azure ( Blau ) <br> Sekundärfarbe: Azure ( Blau ) <br> Perleffekt: Alabasterweiß <br> Reifenqualm: / <br> Unterboden: /', 
            'la mano azura mc ug': 'Primärfarbe: Gletscherblau <br> Sekundärfarbe: Gletscherblau <br> Perleffekt: Pures Weiß <br> Reifenqualm: / <br> Unterboden: /',
            'onepiece': 'Primärfarbe: Hex: #aeb6bf <br> Sekundärfarbe: Hex: #aeb6bf <br> Perleffekt: 7. Reihe, das vierte (Helles Gold) <br> Reifenqualm: ./.',
            'onepieceug': 'Primärfarbe: Mattschwarz <br> Sekundärfarbe: / <br> Perleffekt: Helles Gold',
            'peso vip': 'Primärfarbe: #797582 <br> Sekundärfarbe: #797582 <br> Perleffekt: Schwarz (Nichts) <br> Reifenqualm: ./.',
            'peso ug vip': 'Primärfarbe: Matt Schwarz <br> Sekundärfarbe: Kiefern Grün <br> Perleffekt: Kiefern Grün <br> Reifenqualm: ./.', 
            'sacra corona unita vip': 'Primärfarbe: Matt Schwarz <br> Sekundärfarbe: Matt Schwarz <br> Perleffekt: Metallic Lila <br> Unterboden: Weiß',
            'alex lang vip2': 'Info: Bekommen 40% auf alle Fahrzeuge',
            'emma nackendick vip2': 'Info: Bekommen 40% auf alle Fahrzeuge', 
            'emir pearce vip2': 'Info: Bekommen 40% auf alle Fahrzeuge',
            'karlson tonic vip2': 'Info: Bekommen 40% auf alle Fahrzeuge',
            'luan schoko shakur vip2': 'Info: Bekommen 40% auf alle Fahrzeuge', 
            'norbert nackendick vip2': 'Info: Bekommen 40% auf alle Fahrzeuge',
            'sarah tonic vip2': 'Info: Bekommen 40% auf alle Fahrzeuge', 
            'vargo azrail vip2': 'Info: Bekommen 40% auf alle Fahrzeuge', 
            'kylo sanymaaa vip2': 'Info: Bekommen 40% auf alle Fahrzeuge', 
            'emreh can vip2': 'Info: Bekommen 40% auf alle Fahrzeuge',
            'khidir mekri vip2': 'Info: Bekommen 40% auf alle Fahrzeuge',
            'Mario Wagner vip2': 'Info: Bekommen 40% auf alle Fahrzeuge', 
            'abderahim vip2': 'Info: Gilt für alle mit dem Nachnamen Abderahim <br> Bekommen 40% auf alle Fahrzeuge',
            'pd cid vip': 'Primärfarbe: Mitternachtblau <br> Sekundärfarbe: ./. <br> Perleffekt: Stahlguss (Bei Schwarz) <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos,', 
            'pd gtf vip': 'Primärfarbe: Schwarz <br> Sekundärfarbe: Schwarz <br> Perleffekt: Schwarz <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos',
            'pd jugular vip': 'Primärfarbe: Amethyst (Lila) <br> Sekundärfarbe: ./. <br> Perleffekt: Diamantenblau mit Sticker: Fukura <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'pd jugulargtf vip': 'Primärfarbe: Amethyst (Lila) <br> Sekundärfarbe: ./. <br> Perleffekt: Diamantenblau mit Sticker: Terroil <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'pd s.p.f.u vip': 'Primärfarbe: Carbon (Schwarz) <br> Sekundärfarbe: Carbon (Schwarz) <br> Perleffekt: Alabaster Weiß <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'pd swat vip': 'Primärfarbe: Nickel <br> Sekundärfarbe: ./. <br> Perleffekt: Alabaster Weiß mit Sticker: PD <br> Reifenqualm: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos',
            'pd unmarked vip': 'Primärfarbe: Beton Grau <br> Sekundärfarbe: / <br> Perleffekt: Pures Weiß <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'sd doa': 'Primärfarbe: Alabaster Weiß <br> Sekundärfarbe: Alabaster Weiß <br> Perleffekt: Creme <br> Info: Die Ränge Cadet, Junior Deputy und Deputy tunen Dienstfahrzeuge kostenlos', 
            'sd einsatz': 'Primärfarbe: Sandbraun <br> Sekundärfarbe: - <br> Perleffekt: Orange <br> Info: Die Ränge Cadet, Junior Deputy und Deputy tunen Dienstfahrzeuge kostenlos', 
            'sd jugular': 'Primärfarbe: Mattes Laubgrün <br> Sekundärfarbe: Weiß <br> Perleffekt: Rot, Sticker: Jakeys <br> Info: Die Ränge Praktikant, Cadet, Junior Deputy und Deputy tunen Dienstfahrzeuge kostenlos', 
            'sd noose': 'Primärfarbe: Schwarz <br> Sekundärfarbe: Schwarz <br> Perleffekt: Alabaster Weiß <br> Info: Die Ränge Cadet, Junior Deputy und Deputy tunen Dienstfahrzeuge kostenlos',
            'sd unmarked': 'Primärfarbe: Renngrün <br> Sekundärfarbe: --- <br> Perleffekt: Limonengrün <br> Info: Die Ränge Cadet, Junior Deputy und Deputy tunen Dienstfahrzeuge kostenlos', 
            'us marshals vip': 'Primärfarbe: Jagt Grün <br> Sekundärfarbe: Jagt Grün <br> Perleffekt: Jagt Grün <br> Info: Die Ränge Praktikant, Deputy Marshal 1, Deputy Marshal 2 und Deputy Marshal 3 tunen Dienstfahrzeuge kostenlos',  
            'us marshals unmarked vip': 'Primärfarbe: Indigo Lila <br> Sekundärfarbe: Indigo Lila <br> Perleffekt: Helles Orange <br> Info: Die Ränge Praktikant, Deputy Marshal 1, Deputy Marshal 2 und Deputy Marshal 3 tunen Dienstfahrzeuge kostenlos',
            'unicorn': 'Primärfarbe: Elektrisches Blau <br> Sekundärfarbe: ./. <br> Perleffekt: Elektrisches Pink <br> Reifenqualm: ./.',   
            'vagos vip': 'Primärfarbe: Renngelb <br> Sekundärfarbe: Renngelb <br> Perleffekt: Alabaster Weiß <br> Reifenqualm: Gelb <br> Unterboden: Gelb',
            'vagos ug vip': 'Primärfarbe: Matt Schwarz <br> Sekundärfarbe: Matt Schwarz <br> Perleffekt: Orange ',
            'blue lock': 'Primär: Matt Schwarz <br> Sekundär: ./. <br> Perleffekt: Surfer Blau',
            'scandinavian tribe': 'Primär: Metallic Blau <br> Sekundär: ./. <br> Perleffekt: Helles Gold',
            'la casa nera': 'Primär: Matt Schwarz <br> Sekundär: ./. <br> Perleffekt: Dunkles Rot',
            'street money murders': 'Primär: Lila Metallic <br> Sekundär: ./. <br> Perleffekt: Alabasterweiß',
            'most wanted marocs mc': 'Primär: Cabernet Rot <br> Sekundär: ./. <br> Perleffekt: Limonengrün',
            'clover cartel': 'Primär: Matt Schwarz <br> Sekundär: ./. <br> Perleffekt: Hellgrün',
            'red rose vip': 'Primär: #290000 <br> Sekundär: ./. <br> Perleffekt: 3. Reihe, das fünfte (Letzte)',
            'la moretti': 'Primär: #121011 <br> Sekundär: ./. <br> Perleffekt: Zuckerpflaume',
            'van de straat vip': 'Primär: Schwarz Matt <br> Sekundär: Schwarz Matt <br> Perleffekt: Lachsrosa',
            'redline mc vip': 'Primär: Dunkles Grau <br> Sekundär: ./. <br> Perleffekt: Zuckerpflaume Rosa',
            'black hand': 'Primär: Jagdgrün <br> Sekundär: ./. <br> Perleffekt: Bonbonrot',
            'grove street': 'Primär: Rasengrün <br> Sekundär: ./. <br> Perleffekt: Helles Gold',
            'zivi vip2': 'Info: Bekommen 40% auf alle Fahrzeuge', 

            
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
    // 1. Auslesen der "Dienstnummer des Arbeiters" aus dem Element
    const workerNumber = localStorage.getItem("dienstnummer") || "Unbekannt";

    

    // 2. Name aus dem Eingabefeld "kundenname"
    const customerName = document.getElementById("kundenname").value;

    // 3. Endpreis aus dem Element "total-price"
    let finalPrice = document.getElementById("total-price").textContent;

    // 4. Headlights prüfen und ggf. an den Preis anhängen
    const headlightsValue = document.getElementById("headlights").value;
    if (headlightsValue === "1") {
        finalPrice += " (inkl. Headlights)";
    } else if (headlightsValue === "2") {
        finalPrice += " (inkl. Headlightsfarbe)";
    }

    // 5. Customkennzeichen prüfen und ggf. an den Preis anhängen
    const customKennzeichenChecked = document.getElementById("customkennzeichen").checked;
    if (customKennzeichenChecked) {
        finalPrice += " (inkl. Kennzeichen)";
    }

    // 6. Ausgewählte Zuordnung aus dem Dropdown "zuordnungSelect"
    const zuordnungSelect = $('#zuordnungSelect');
    const zuordnungValue = zuordnungSelect.val();
    const zuordnungText = zuordnungSelect.find("option:selected").text();
    const filteredZuordnungText = zuordnungText.replace(/[^\p{L}\s]/gu, '');

    console.log("Debug: Dropdown 'zuordnungSelect' value:", zuordnungValue);

    if (zuordnungValue === "zivilist") {
        // Hier keine Meldung mehr anzeigen
        // Du kannst stattdessen zum Beispiel eine Funktion ausführen oder das Formular weiter bearbeiten
    } else {
        // Hier kannst du z.B. den Text irgendwo anders anzeigen
        // Oder eine andere Aktion ausführen
    }


    // 7. Dienstnummer aus dem Eingabefeld "dienstnummer"
    const dienstnummerValue = document.getElementById("dienstnummerkunde").value;

    // 8. Gutscheine auswerten: Zähle, wie viele Gutscheine verwendet wurden
    const voucher1Value = document.getElementById("gutschein1").value;
    const voucher2Value = document.getElementById("gutschein2").value;
    let voucherCount = 0;

    if (voucher1Value && voucher1Value !== "0") {
        voucherCount++;
    }
    if (voucher2Value && voucher2Value !== "0") {
        voucherCount++;
    }

    // Gutschein-Text nur hinzufügen, wenn ein Gutschein verwendet wurde
    const voucherText = voucherCount > 0 ?  ` -- Gutschein: [${voucherCount}]` : "";

    // Dienstnummer nur hinzufügen, wenn sie nicht leer ist
    const dienstnummerText = dienstnummerValue ?  ` -- Dienstnummer: ${dienstnummerValue}` : "";

    // Zusammensetzen der Nachricht:
    const message = `${workerNumber} - ${customerName} | ${finalPrice} | ${filteredZuordnungText}${dienstnummerText}${voucherText}`;

    // Nachricht via Discord-Webhook senden
    fetch("https://discord.com/api/webhooks/1350909051487260702/UpVJL6dMmBcUs-W-tyB9RxF8wGtNYQKIPltMqGYSdafMLJ7A4gA7FH0w-wIEO23o9Yfe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
    })
    .then(response => response.text())
    .then(data => console.log("Erfolg:", data))
    .catch(error => console.error("Fehler:", error));
});

window.onload = function() {
    const dienstnummer = localStorage.getItem("dienstnummer"); // Auslesen der Dienstnummer

    if (dienstnummer) {
        // Ersetzen des Platzhalters mit der Dienstnummer
        document.querySelector('.dienstnummer-info').innerHTML = `Dienstnummer des Arbeiters: ${dienstnummer}`;
    } else {
        console.error("Dienstnummer nicht gefunden.");
    }
};
