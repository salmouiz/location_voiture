import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1500)
  }

  const inputClasses = "w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200 shadow-sm"
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2"

  const subjects = [
    "Location de voiture",
    "Vente de voiture", 
    "Partenariat",
    "Réclamation",
    "Autre"
  ]

  const faqs = [
    {
      q: "Comment réserver une voiture ?",
      a: "Rendez-vous sur notre catalogue, choisissez votre véhicule et cliquez sur 'Réserver'. Notre équipe vous contactera sous 2h."
    },
    {
      q: "Quels documents sont nécessaires ?",
      a: "Permis de conduire valide, carte d'identité nationale, et un justificatif de domicile de moins de 3 mois."
    },
    {
      q: "Puis-je annuler ma réservation ?",
      a: "Oui, l'annulation est gratuite jusqu'à 48h avant le départ. Au-delà, des frais de 20% s'appliquent."
    },
    {
      q: "Proposez-vous un service de livraison ?",
      a: "Oui, nous livrons votre véhicule à l'aéroport Mohammed V, à votre hôtel ou à votre domicile à Casablanca."
    }
  ]

  const stats = [
    { number: "15,000+", label: "Clients satisfaits" },
    { number: "500+", label: "Véhicules disponibles" },
    { number: "24/7", label: "Assistance client" },
    { number: "4.9/5", label: "Note moyenne" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/20">
      
      {/* ===== HERO SECTION ===== */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-300 text-xs font-semibold rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Disponible maintenant
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Contactez <span className="text-blue-400">AysiCar</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Notre équipe d'experts est à votre disposition pour vous accompagner dans votre location ou l'achat de votre véhicule idéal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* ===== STATISTIQUES ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 -mt-28 relative z-20">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ===== GRILLE PRINCIPALE : FORMULAIRE + INFOS ===== */}
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* COLONNE GAUCHE : Formulaire (3/5) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              
              <div className="p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
                  <p className="text-gray-400 text-sm">Remplissez le formulaire ci-dessous, nous vous répondrons sous 24h.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Nom + Email sur la même ligne */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelClasses}>Nom complet *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="currentColor"/>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`${inputClasses} pl-11`}
                          placeholder="Jean Dupont"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClasses}>Adresse e-mail *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z" fill="currentColor"/>
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`${inputClasses} pl-11`}
                          placeholder="jean@exemple.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Téléphone + Sujet */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Téléphone</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`${inputClasses} pl-11`}
                          placeholder="+212 6XX-XXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className={labelClasses}>Sujet *</label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`${inputClasses} appearance-none pr-10`}
                          required
                        >
                          <option value="">Choisir un sujet</option>
                          {subjects.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 9l6 6 6-6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClasses}>Votre message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClasses} resize-none`}
                      placeholder="Décrivez votre demande en détail..."
                      required
                    />
                    <div className="text-right text-xs text-gray-300 mt-1">
                      {formData.message.length}/500 caractères
                    </div>
                  </div>

                  {/* Bouton */}
                  <button
                    type="submit"
                    disabled={loading || sent}
                    className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      sent
                        ? 'bg-green-500 shadow-green-500/25'
                        : loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    {sent ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message envoyé avec succès !
                      </>
                    ) : loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="#fff"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    En envoyant ce formulaire, vous acceptez notre <a href="#" className="text-blue-500 hover:underline">politique de confidentialité</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : Infos de contact (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Carte infos */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Nos coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Siège social</h4>
                    <p className="text-gray-500 text-sm mt-1">123 Boulevard Mohammed VI<br/>Casablanca, 20000, Maroc</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline mt-2 inline-flex items-center gap-1">
                      Voir sur Google Maps
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Téléphone</h4>
                    <p className="text-gray-500 text-sm mt-1">+212 5 22 88 77 66</p>
                    <p className="text-gray-500 text-sm">+212 6 12 34 56 78</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">E-mail</h4>
                    <p className="text-gray-500 text-sm mt-1">contact@aysicar.ma</p>
                    <p className="text-gray-500 text-sm">support@aysicar.ma</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Horaires d'ouverture</h4>
                    <div className="text-gray-500 text-sm mt-1 space-y-1">
                      <p className="flex justify-between"><span>Lundi - Vendredi</span> <span className="font-medium text-gray-700">8h30 - 18h30</span></p>
                      <p className="flex justify-between"><span>Samedi</span> <span className="font-medium text-gray-700">9h00 - 13h00</span></p>
                      <p className="flex justify-between"><span>Dimanche</span> <span className="text-red-400 font-medium">Fermé</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
              <p className="text-slate-400 text-sm mb-6">Restez informé de nos nouveautés et promotions exclusives.</p>
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { name: 'Instagram', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 hover:opacity-90', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 3h9a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3z' },
                  { name: 'LinkedIn', color: 'bg-blue-700 hover:bg-blue-800', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                  { name: 'WhatsApp', color: 'bg-green-500 hover:bg-green-600', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center transition-all duration-200 hover:scale-110`}
                    title={social.name}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Urgence */}
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="font-bold text-red-700">Assistance urgente</h4>
              </div>
              <p className="text-red-600 text-sm">En cas de panne ou d'accident, notre hotline est disponible 24h/24 :</p>
              <a href="tel:+212612345678" className="text-red-700 font-bold text-lg mt-1 block hover:underline">+212 6 12 34 56 78</a>
            </div>
          </div>
        </div>

        {/* ===== FAQ ===== */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Questions fréquentes</h2>
            <p className="text-gray-400 mt-2">Trouvez rapidement une réponse à vos questions</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50/50 transition-colors duration-200 group">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">{faq.q}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CTA FINAL ===== */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-12 text-white shadow-xl shadow-blue-500/20">
          <h2 className="text-3xl font-bold mb-4">Prêt à rouler ?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Découvrez notre flotte de véhicules premium et réservez en quelques clics. Livraison gratuite à Casablanca.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/cars" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Voir les véhicules
            </a>
            <a href="tel:+212522887766" className="px-8 py-4 bg-blue-400/30 text-white border border-white/30 rounded-xl font-semibold hover:bg-blue-400/50 transition-colors">
              Appeler maintenant
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact