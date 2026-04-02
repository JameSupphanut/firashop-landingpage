เอกสารโมดูล: [nuxt.com/modules/lottie](https://nuxt.com/modules/lottie)

## วิธีใช้งานย่อ

1. นำไฟล์แอนิเมชัน **`.json`** (จาก LottieFiles หรือเครื่องมืออื่น) มาวางในโฟลเดอร์นี้
2. ใน Vue ใช้คอมโพเนนต์ `<Lottie>` (auto-import) โดยระบุชื่อไฟล์ **ไม่รวม `.json`**

ตัวอย่าง:

```
app/assets/lottie/
├── hero.json
└── icons/
    └── check.json
```

```vue
<template>
  <Lottie name="hero" />
  <Lottie name="icons/check" />
</template>
```

ทางเลือกอื่น:

- ส่ง object ผ่าน prop `data` หลัง import JSON ใน `<script>`
- ส่ง URL ผ่าน prop `link` (CDN / ลิงก์ภายนอก)

## หมายเหตุ

- ชื่อไฟล์และ path ใน `name` ต้องตรงกับโครงสร้างจริง (รองรับ nested folder ด้วย `โฟลเดอร์/ชื่อไฟล์`)
- คอมโพเนนต์ทำงานฝั่ง client; ถ้าต้องการควบคุมเล่น/หยุด ใช้ `ref` เรียกเมธอด เช่น `play()`, `pause()` ตาม [เอกสารโมดูล](https://nuxt.com/modules/lottie)
