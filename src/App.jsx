import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Heart, Search, Trash2, Send, Coffee, CakeSlice, UtensilsCrossed } from "lucide-react";

const menu = [
  {
    id: 1,
    name: "番茄牛腩饭",
    category: "主食",
    price: 18.8,
    desc: "酸甜番茄汤汁，软烂牛腩，适合想认真吃饭的时候。",
    tag: "今日推荐",
    emoji: "🍅",
  },
  {
    id: 2,
    name: "照烧鸡腿饭",
    category: "主食",
    price: 16.8,
    desc: "鸡腿肉多汁，甜咸口，配米饭很稳。",
    tag: "超下饭",
    emoji: "🍗",
  },
  {
    id: 3,
    name: "肥牛乌冬面",
    category: "主食",
    price: 19.9,
    desc: "暖暖一碗，适合不想吃米饭的时候。",
    tag: "暖胃",
    emoji: "🍜",
  },
  {
    id: 4,
    name: "草莓奶油蛋糕",
    category: "甜品",
    price: 12.8,
    desc: "小小一块，甜度刚好，吃完心情会变好。",
    tag: "女朋友专属",
    emoji: "🍰",
  },
  {
    id: 5,
    name: "芒果布丁",
    category: "甜品",
    price: 9.9,
    desc: "冰冰凉凉，饭后快乐加倍。",
    tag: "饭后甜点",
    emoji: "🥭",
  },
  {
    id: 6,
    name: "芝士薯条",
    category: "小吃",
    price: 10.8,
    desc: "追剧必备，趁热吃最好。",
    tag: "小馋嘴",
    emoji: "🍟",
  },
  {
    id: 7,
    name: "柠檬红茶",
    category: "饮品",
    price: 7.8,
    desc: "清爽解腻，少冰/正常冰都可以备注。",
    tag: "清爽",
    emoji: "🍋",
  },
  {
    id: 8,
    name: "热可可",
    category: "饮品",
    price: 8.8,
    desc: "适合冷天，也适合被哄的时候。",
    tag: "甜甜的",
    emoji: "☕",
  },
];

const categories = ["全部", "主食", "小吃", "甜品", "饮品"];

function categoryIcon(category) {
  if (category === "饮品") return <Coffee className="h-4 w-4" />;
  if (category === "甜品") return <CakeSlice className="h-4 w-4" />;
  return <UtensilsCrossed className="h-4 w-4" />;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});
  const [note, setNote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchCategory = activeCategory === "全部" || item.category === activeCategory;
      const matchQuery = `${item.name} ${item.desc} ${item.tag}`.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [activeCategory, query]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const item = menu.find((food) => food.id === Number(id));
        return item ? { ...item, qty } : null;
      })
      .filter(Boolean);
  }, [cart]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const addItem = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeItem = (id) => {
    setCart((prev) => {
      const nextQty = (prev[id] || 0) - 1;
      const next = { ...prev };
      if (nextQty <= 0) delete next[id];
      else next[id] = nextQty;
      return next;
    });
  };
  const clearCart = () => setCart({});

  const submitOrder = () => {
    if (!cartItems.length) return;
    setShowSuccess(true);
    window.setTimeout(() => setShowSuccess(false), 2600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-pink-100 text-stone-900">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-200">
              <Heart className="h-5 w-5 fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight sm:text-xl">远远专属点单小店</h1>
              <p className="text-xs text-stone-500 sm:text-sm">想吃什么，点一下就好啦</p>
            </div>
          </div>
          <div className="relative rounded-full bg-rose-500 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-rose-200">
            <ShoppingCart className="inline h-4 w-4" />
            <span className="ml-1">{count}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_380px]">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 overflow-hidden rounded-[2rem] bg-white/80 p-5 shadow-xl shadow-rose-100 ring-1 ring-white/70 sm:p-7"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">今天也要好好吃饭 ♡</p>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">宝宝想吃什么？</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">点完后会生成一份订单，你可以截图发给我，或者我后面也可以帮你接到微信/邮箱/数据库。</p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-rose-500 to-orange-400 p-4 text-white shadow-lg shadow-orange-100">
                <p className="text-xs opacity-90">当前合计</p>
                <p className="text-2xl font-black">¥{total.toFixed(1)}</p>
              </div>
            </div>
          </motion.div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                    activeCategory === cat
                      ? "bg-stone-900 text-white shadow-lg shadow-stone-200"
                      : "bg-white/80 text-stone-600 ring-1 ring-stone-100 hover:bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索想吃的..."
                className="w-full rounded-full bg-white/90 py-2 pl-9 pr-4 text-sm outline-none ring-1 ring-stone-100 focus:ring-2 focus:ring-rose-300"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item) => (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="rounded-[1.75rem] bg-white/85 p-4 shadow-lg shadow-rose-100 ring-1 ring-white/80"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                        {item.emoji}
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-black">{item.name}</h3>
                          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-500">
                            {categoryIcon(item.category)} {item.category}
                          </span>
                        </div>
                        <p className="text-sm leading-5 text-stone-500">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-rose-500">{item.tag}</p>
                      <p className="text-xl font-black">¥{item.price.toFixed(1)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {cart[item.id] ? (
                        <button onClick={() => removeItem(item.id)} className="rounded-full bg-stone-100 p-2 hover:bg-stone-200">
                          <Minus className="h-4 w-4" />
                        </button>
                      ) : null}
                      {cart[item.id] ? <span className="min-w-5 text-center font-black">{cart[item.id]}</span> : null}
                      <button onClick={() => addItem(item.id)} className="rounded-full bg-rose-500 p-2 text-white shadow-lg shadow-rose-200 hover:bg-rose-600">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-[2rem] bg-white/90 p-5 shadow-xl shadow-rose-100 ring-1 ring-white/80">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">我的小订单</h2>
                <p className="text-sm text-stone-500">共 {count} 份</p>
              </div>
              {cartItems.length ? (
                <button onClick={clearCart} className="rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200">
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            {!cartItems.length ? (
              <div className="rounded-3xl border border-dashed border-rose-200 bg-rose-50/70 p-6 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl">🛒</div>
                <p className="font-bold text-stone-700">购物车还是空的</p>
                <p className="mt-1 text-sm text-stone-500">先挑一个今天想吃的吧</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl bg-stone-50 p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-stone-500">¥{item.price.toFixed(1)} × {item.qty}</p>
                      </div>
                    </div>
                    <p className="font-black">¥{(item.price * item.qty).toFixed(1)}</p>
                  </div>
                ))}
              </div>
            )}

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="备注：比如少辣、不要香菜、想要奶茶半糖..."
              className="mt-4 min-h-24 w-full resize-none rounded-3xl bg-stone-50 p-4 text-sm outline-none ring-1 ring-stone-100 focus:ring-2 focus:ring-rose-300"
            />

            <div className="mt-4 rounded-3xl bg-stone-900 p-4 text-white">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>合计</span>
                <span>{count} 份</span>
              </div>
              <div className="mt-1 flex items-end justify-between">
                <span className="text-3xl font-black">¥{total.toFixed(1)}</span>
                <span className="text-xs text-white/60">不含男朋友跑腿费</span>
              </div>
            </div>

            <button
              onClick={submitOrder}
              disabled={!cartItems.length}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-3xl bg-rose-500 px-5 py-4 font-black text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none"
            >
              <Send className="h-4 w-4" />
              提交给男朋友
            </button>

            <AnimatePresence>
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 rounded-3xl bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-700 ring-1 ring-emerald-100"
                >
                  下单成功！截图发给男朋友就可以啦 ♡
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </aside>
      </main>
    </div>
  );
}
