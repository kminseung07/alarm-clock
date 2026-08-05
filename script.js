const heightSlider = document.getElementById('height');
const weightSlider = document.getElementById('weight');
const heightVal = document.getElementById('heightVal');
const weightVal = document.getElementById('weightVal');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const needle = document.getElementById('needle');

// BMI 구간: <18.5 저체중 / 18.5~23 정상 / 23~25 과체중 / 25+ 비만 (아시아 기준)
const ranges = [
  { max: 18.5, label: '저체중', color: '#8AA39B' },
  { max: 23,   label: '정상',   color: '#5FBFA0' },
  { max: 25,   label: '과체중', color: '#E8A85F' },
  { max: Infinity, label: '비만', color: '#E0685A' }
];

function updateSliderFill(slider){
  const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--tick) ${pct}%)`;
}

function calculate(){
  const h = parseFloat(heightSlider.value) / 100;
  const w = parseFloat(weightSlider.value);
  const bmi = w / (h * h);

  heightVal.textContent = `${heightSlider.value} cm`;
  weightVal.textContent = `${weightSlider.value} kg`;
  bmiValue.textContent = bmi.toFixed(1);

  const cat = ranges.find(r => bmi < r.max);
  bmiCategory.textContent = cat.label;
  bmiCategory.style.color = cat.color;
  bmiCategory.style.background = cat.color + '22';

  // 게이지 needle 위치: 15 ~ 32 범위를 0~100%로 매핑 (clamp)
  const clamped = Math.min(Math.max(bmi, 15), 32);
  const needlePct = ((clamped - 15) / (32 - 15)) * 100;
  needle.style.left = `calc(${needlePct}% - 1px)`;
  needle.style.background = cat.color;

  updateSliderFill(heightSlider);
  updateSliderFill(weightSlider);
}

heightSlider.addEventListener('input', calculate);
weightSlider.addEventListener('input', calculate);

calculate();
