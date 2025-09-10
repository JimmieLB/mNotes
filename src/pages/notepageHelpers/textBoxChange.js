const shortCuts = {
    "integral": '∫',
    "sqrt": '√',
    "alpha": 'α',
    "beta": 'β',
    "gamma": 'γ',
    "delta": 'δ',
    "theta": 'θ',
    "lambda": 'λ',
    "pi": 'π',
    "sigma": 'σ',
    "phi": 'φ',
    "omega": 'ω',
    "sum": '∑',
    "infinity": '∞',
    "degree": '°',
    "->": '→',
    "<-": '←',
    "<=": '≤',
    ">=": '≥',
    "!=": '≠',
    "approx": '≈',
    "tau": 'τ',
    "mu": 'μ',
    "epsilon": 'ε',
    "zeta": 'ζ',
    "kappa": 'κ',
    "rho": 'ρ',
    "chi": 'χ',
    "Delta": 'Δ',

}

export default function textBoxChange(textBox, fabricCanvasRef) {
    let text = textBox.text;
    for (let key in shortCuts) {
        if (text.includes(key)) {
            let newText = text.replace(key, shortCuts[key]);
            textBox.set('text', newText);
            fabricCanvasRef.current.discardActiveObject();
            fabricCanvasRef.current.setActiveObject(textBox);
            fabricCanvasRef.current.renderAll();
            textBox.exitEditing();
            textBox.enterEditing();
            textBox.setSelectionStart(newText.length);
            textBox.setSelectionEnd(newText.length);
        }
    }
}