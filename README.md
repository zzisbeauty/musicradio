# Claudio FM 本地 MVP

Claudio FM 是一个本地优先的 AI 音乐电台 MVP：使用本地 MP3 作为音源，前端用 React PWA 播放，后端用 Express 扫描音乐、生成时间段歌单和模板化 Claudio 回复。

## 项目结构

```txt
.
├── frontend/          # React 18 + Vite + Tailwind + PWA + Howler
├── backend/           # Node.js + Express API
├── music/             # 本地 MP3 文件夹，不提交 Git
├── prompts/           # Claudio persona prompt
├── data/              # 歌单数据与蒸馏数据
├── README.md          # 启动说明
└── package.json       # 根目录并发启动脚本
```

## 准备音乐文件

把你的合法本地 MP3 放到：

```bash
music/
```

建议文件名格式：

```txt
周杰伦 - 七里香.mp3
Faye Wong - 匆匆那年.mp3
```

系统会自动扫描 `music/` 下的音频文件。

## 安装依赖

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

## 启动开发环境

```bash
npm run dev
```

默认端口：

- 后端：http://localhost:3001
- 前端：http://localhost:5173

## 可用 API

```bash
curl http://localhost:3001/api/music/list
curl http://localhost:3001/api/radio/current
curl -X POST http://localhost:3001/api/chat -H "Content-Type: application/json" -d '{"message":"我今天很累"}'
```

## 本地 MVP 已实现

- 本地音乐扫描
- 时间段调度
- Claudio 模板 persona
- 歌曲介绍文案模板
- 聊天框
- Howler.js 播放
- 播放 / 暂停 / 下一首 / 进度条
- 波形氛围动画
- 暗黑极简 UI
- PWA manifest

## 时间段逻辑

- 06:00-10:00：轻柔醒来
- 11:00-14:00：活力工作
- 15:00-18:00：放松通勤
- 19:00-23:00：治愈夜晚
- 00:00-05:59：安静睡眠

## 后续接入 Claude + ElevenLabs

当前 MVP 不依赖任何 API Key。后续可以把：

- `backend/services/persona.js` 替换为 Claude 调用
- `backend/services/tts.js` 新增 ElevenLabs 调用
- 前端在每首歌播放前先播放 TTS 音频，再播放音乐

推荐环境变量：

```bash
ANTHROPIC_API_KEY=your_key
ELEVENLABS_API_KEY=your_key
ELEVENLABS_VOICE_ID=your_voice_id
```

## 数据蒸馏建议

你已有 `tracks.json`，可以逐步扩展为：

```json
{
  "name": "七里香",
  "artist": "周杰伦",
  "moods": ["nostalgic", "evening"],
  "timeSlots": ["evening", "afternoon"],
  "weight": 8
}
```
