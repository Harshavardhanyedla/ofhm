"use client";

import { useState } from "react";
import { Search, Play, Calendar, User, Tag } from "lucide-react";
import { motion } from "framer-motion";

const sermons = [
    {
        "title": "Family Christmas|Pastor's & Leaders| OFHM CAMPUS| 20-12-2025.",
        "url": "https://www.youtube.com/watch?v=bwx2mpX48Vw",
        "id": "bwx2mpX48Vw"
    },
    {
        "title": "Handing Out New Blankets and Hugs to the little soul's / Matthew 25:35-40 ",
        "url": "https://www.youtube.com/watch?v=BoeOL8OvI40",
        "id": "BoeOL8OvI40"
    },
    {
        "title": "Pastors & Leaders Conference by Kingsalmon-G | Bible Distribution | Baptism | Bible Classes | ",
        "url": "https://www.youtube.com/watch?v=6ZaSerPo1Lo",
        "id": "6ZaSerPo1Lo"
    },
    {
        "title": "OFHM Pastor's and Leaders Conference | Baptism | Bishop.Rev.Dr. Salmon G",
        "url": "https://www.youtube.com/watch?v=5b8UbEFFV7c",
        "id": "5b8UbEFFV7c"
    },
    {
        "title": "OFHM Little Hearts       (James 1:27,)",
        "url": "https://www.youtube.com/watch?v=k-pfKdYhvTw",
        "id": "k-pfKdYhvTw"
    },
    {
        "title": " Pastor's and Leaders Conference (John 12:26) | Bishop.Rev.Dr. Salmon G",
        "url": "https://www.youtube.com/watch?v=okON8GtfNr8",
        "id": "okON8GtfNr8"
    },
    {
        "title": "OFHM Pastor's and Leaders Conference | Outreach | Baptism | Bishop.Rev.Dr. Salmon G ",
        "url": "https://www.youtube.com/watch?v=qV6LWcoBUXw",
        "id": "qV6LWcoBUXw"
    },
    {
        "title": "OFHM Pastors & Leader's Conference | Bishop.Rev.Dr. Salmon G",
        "url": "https://www.youtube.com/watch?v=04hOaK9ELdY",
        "id": "04hOaK9ELdY"
    },
    {
        "title": "OFHM Little Heart's",
        "url": "https://www.youtube.com/watch?v=QsapwokKOPI",
        "id": "QsapwokKOPI"
    },
    {
        "title": "OFHM Church Planters training programs & Outreach team ( www.ofhmindia.org )",
        "url": "https://www.youtube.com/watch?v=tgZHFINMfaU",
        "id": "tgZHFINMfaU"
    },
    {
        "title": "OFHM Pastor's and Leaders Conference (The Lord will stand with you and give you STRENGTH(2 Tim 4:17)",
        "url": "https://www.youtube.com/watch?v=4Ao2xRLKKSQ",
        "id": "4Ao2xRLKKSQ"
    },
    {
        "title": "OFHM' #గండేపల్లి మండల (కె.నాయకంపల్లి) పాస్టర్స్  ఫామిలీ క్రిస్మస్🎄🎁#love #motivation",
        "url": "https://www.youtube.com/watch?v=pWR9J7vYn9o",
        "id": "pWR9J7vYn9o"
    },
    {
        "title": "OFHM Pastor's & Leaders Conference",
        "url": "https://www.youtube.com/watch?v=dceZrCTrPHY",
        "id": "dceZrCTrPHY"
    },
    {
        "title": "“Disciplishp making movements.                                    ( Matt 28:18-20).",
        "url": "https://www.youtube.com/watch?v=qcta8ERKgIo",
        "id": "qcta8ERKgIo"
    },
    {
        "title": "Sunday Service 17/03/2024",
        "url": "https://www.youtube.com/watch?v=IimbI_UjnGQ",
        "id": "IimbI_UjnGQ"
    },
    {
        "title": "OFHM ( mission India) Know Him& make Him known",
        "url": "https://www.youtube.com/watch?v=ZzZovX4dldI",
        "id": "ZzZovX4dldI"
    },
    {
        "title": "OFHM Pastors and leader's are learning the word at His feet Matt 11:29.",
        "url": "https://www.youtube.com/watch?v=pO4gGct9gpo",
        "id": "pO4gGct9gpo"
    },
    {
        "title": "My Personal testimony",
        "url": "https://www.youtube.com/watch?v=phIXpyDAINk",
        "id": "phIXpyDAINk"
    },
    {
        "title": "OFHM PASTORS ORDINATION SERVICE",
        "url": "https://www.youtube.com/watch?v=R9cXDknOtx8",
        "id": "R9cXDknOtx8"
    },
    {
        "title": "Pray for remaining construction project of OFHM building",
        "url": "https://www.youtube.com/watch?v=3Bts1kraf5w",
        "id": "3Bts1kraf5w"
    },
    {
        "title": "covid relief for lockdown areas.",
        "url": "https://www.youtube.com/watch?v=Zewija1ZDrI",
        "id": "Zewija1ZDrI"
    },
    {
        "title": "covid-19 second wave relief to poor, needy and covid effected areas.",
        "url": "https://www.youtube.com/watch?v=ehrpPg27hYA",
        "id": "ehrpPg27hYA"
    },
    {
        "title": "Sharing the Gospel through showing the love of God,during the second view of  COVID-19 Pendemic",
        "url": "https://www.youtube.com/watch?v=EjxXRdfe9Gw",
        "id": "EjxXRdfe9Gw"
    },
    {
        "title": "OUR FATHERS HOME MINISTRIES Reaching people with the Word & Deed  (Luke 4:18).",
        "url": "https://www.youtube.com/watch?v=apWqeZ-ed4g",
        "id": "apWqeZ-ed4g"
    },
    {
        "title": "OUR FATHERS HOME MINISTRIES Reaching  people with the word & Deed         (LUKE 4:18).",
        "url": "https://www.youtube.com/watch?v=wSvCHS0oOVY",
        "id": "wSvCHS0oOVY"
    },
    {
        "title": "OFHM ACTIVITIES",
        "url": "https://www.youtube.com/watch?v=MGrBph-1hRk",
        "id": "MGrBph-1hRk"
    },
    {
        "title": "New year thanks giving service 2021",
        "url": "https://www.youtube.com/watch?v=_07GjdApNNI",
        "id": "_07GjdApNNI"
    },
    {
        "title": "COVID-19 Pandemic Relief to Poor&Needy",
        "url": "https://www.youtube.com/watch?v=MB2xAGuTBws",
        "id": "MB2xAGuTBws"
    },
    {
        "title": "COVID-19 Pandemic Relief to Poor&Needy",
        "url": "https://www.youtube.com/watch?v=6TalbgBA9gA",
        "id": "6TalbgBA9gA"
    },
    {
        "title": "COVID-19  Pandemic Relief to Poor&Needy People",
        "url": "https://www.youtube.com/watch?v=-36-e4-_Km0",
        "id": "-36-e4-_Km0"
    },
    {
        "title": "COVID- 19 Pandemic Relief to Poor&NeedyTrible Pastors From OFHM&Team www.ofhm.in",
        "url": "https://www.youtube.com/watch?v=odWDw1Dl5Co",
        "id": "odWDw1Dl5Co"
    },
    {
        "title": "COVID-19 pandemic Relief From OFHM Bro.... B.V Raju Garu (website:www.ofhm.in)",
        "url": "https://www.youtube.com/watch?v=EXlO3uPdUqY",
        "id": "EXlO3uPdUqY"
    },
    {
        "title": "COVID-19 pandamic relief From OFHM Family",
        "url": "https://www.youtube.com/watch?v=6FoElOKE6_Q",
        "id": "6FoElOKE6_Q"
    },
    {
        "title": "COVID-19 releaf to poor& needy during the lockdown  bro......B.V RAJU GANDHAM founder of (OFHM)",
        "url": "https://www.youtube.com/watch?v=5VqZXDbQet4",
        "id": "5VqZXDbQet4"
    }
];

export default function SermonsPage() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24 pb-12">
                <div className="container mx-auto px-4 md:px-6 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Audio & Video</h2>
                        <h1 className="text-4xl md:text-6xl font-serif text-foreground">Sermon Archive</h1>
                        <p className="text-lg text-foreground/70 font-light leading-relaxed">
                            Watch our latest sermons and messages from YouTube. Grow in your faith anywhere, anytime.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sermons List */}
            <section className="py-24 pt-12 min-h-[600px] bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sermons.map((sermon, index) => (
                            <motion.div
                                key={sermon.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedVideo(sermon.id)}
                            >
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl border border-muted/50">
                                    <img
                                        src={`https://img.youtube.com/vi/${sermon.id}/maxresdefault.jpg`}
                                        alt={sermon.title}
                                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                        onError={(e: any) => {
                                            e.target.src = `https://img.youtube.com/vi/${sermon.id}/0.jpg`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-primary shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                                            <Play className="h-8 w-8 fill-current translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 px-2">
                                    <h3 className="text-lg font-serif text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                        {sermon.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {sermons.length === 0 && (
                        <div className="text-center py-24 space-y-4 text-foreground/30 italic">
                            Videos coming soon...
                        </div>
                    )}
                </div>
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <button
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

