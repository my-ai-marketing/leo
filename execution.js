(function () {
'use strict';
/* All costs in OMR. These are management planning assumptions, not actual LEO results. */
var monthly={paid:11000,ooh:3500,events:2500,creative:1500,crm:500,contingency:1000,staff:7600};
var fmt=function(n,d){return Number(n).toLocaleString('en-GB',{maximumFractionDigits:d||0,minimumFractionDigits:d||0});};
var money=function(n,d){return 'OMR '+fmt(n,d);};
var kpis=function(items){return '<div class="exec-kpis">'+items.map(function(x){return '<article class="exec-kpi"><small>'+x[0]+'</small><strong>'+x[1]+'</strong><span>'+x[2]+'</span></article>';}).join('')+'</div>';};
var table=function(head,rows){return '<div class="exec-tbl"><table><thead><tr>'+head.map(function(x){return '<th>'+x+'</th>';}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return '<tr'+(r[0]==='TOTAL'?' class="total-row"':'')+'>'+r.map(function(c){return '<td>'+c+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div>';};
var note=function(t){return '<div class="exec-note">'+t+'</div>';};
var h=function(n,title,subtitle,lede){return '<div class="section-label">'+n+' / Quantified execution plan</div><div class="exec-tag">90-day gated pilot • Planning assumptions</div><h2 class="display small">'+title+'</h2><p class="exec-scope">'+subtitle+'</p><p class="exec-lede">'+lede+'</p>';};
var panel=function(title,body){return '<article class="exec-panel"><h3>'+title+'</h3>'+body+'</article>';};
var list=function(items){return '<ul class="exec-list">'+items.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';};
var rows=function(items){return items.map(function(x){return '<div class="exec-row"><span>'+x[0]+'</span><strong>'+x[1]+'</strong></div>';}).join('');};
var steps=function(items){return '<div class="exec-steps">'+items.map(function(x,i){return '<div class="exec-step"><em>0'+(i+1)+'</em><strong>'+x[0]+'</strong><p>'+x[1]+'</p></div>';}).join('')+'</div>';};
var sourceLabel='<strong>Planning model, not a forecast:</strong> CPL, qualification, bookings and staffing costs are illustrative hypotheses requiring 14-day calibration. Total country and project allocations describe the SAME paid-media pool and must not be added together.';
function render(id,html,oldVisible){
 var sec=document.getElementById(id); if(!sec)return;
 var inner=sec.querySelector('.section-inner');if(!inner)return;
 var previous=inner.innerHTML;
 inner.innerHTML=html+((oldVisible||id==='planner')?'':'<details class="exec-more"><summary>Open earlier strategy rationale and supporting notes</summary><div class="legacy">'+previous+'</div></details>');
}
var platforms=[
 ['Meta — Facebook / Instagram','4,850','Demand generation, lead forms and landing-page conversion'],
 ['Google Search','3,200','High-intent project, ownership and Muscat property searches'],
 ['YouTube video','1,200','Remarketing and proof-led consideration'],
 ['LinkedIn','850','Selective business-owner and professional audiences'],
 ['Remarketing reserve','900','Cross-platform site visitor and qualified-engagement audiences'],
 ['TOTAL','11,000','One media pool, not additional brand/project budgets']
];
var markets=[
 {id:'india',num:'06',name:'India / Indian-origin buyer cohorts',heading:'India: <span class="accent">100 leads / month.</span>',paid:2200,leads:100,ql:20,
  mix:[['Meta FB/IG',1100],['Google Search',750],['LinkedIn',200],['Retargeting',150]],
  audiences:'Oman/UAE-based Indian business owners and qualified professional families first; India-resident HNIs only through legal-reviewed distribution.',
  outdoor:'Use existing Muscat OOH creative with QR-coded event invitations in relevant business locations. No separate India billboard spend in the pilot.',
  tasks:['Week 1: English/Hindi approved investor pack, ownership FAQ and project qualification form.','Weeks 2–4: two opted-in community/business-network introductions and Meta + Search A/B tests.','Month 2: one 15–20-person investor briefing; retarget only consented or eligible prospects.'],
  team:'1 allocated bilingual closer from the shared three-person closing team; 2 SDRs cover all segments.',
  gate:'Scale if at least 20 qualified leads per month at ≤ OMR 110 CPQL and consultations progress.'},
 {id:'iran',num:'07',name:'Farsi-speaking UAE / Oman residents',heading:'Iranian-origin prospects: <span class="accent">8 QLs / month.</span>',paid:1200,leads:40,ql:8,
  mix:[['Meta FB/IG',550],['Google Search',450],['Retargeting',200]],
  audiences:'Permission-based outreach to UAE/Oman-resident Farsi-speaking prospects; do not assume nationality makes a buyer transaction-eligible.',
  outdoor:'Do not buy Farsi-language outdoor placements until an eligible, sizeable audience and a compliant conversion path are proven.',
  tasks:['Weeks 1–2: legal, sanctions, bankability and source-of-funds approval before launch.','Weeks 2–4: Farsi-language FAQ and qualified-consultation funnel; track geography, not unverified identity proxies.','Month 2: partner-led small briefing only after legal approval and buyer validation.'],
  team:'Shared closer with Farsi interpreter or approved partner; compliance officer reviews leads before transaction progression.',
  gate:'No spend before compliance sign-off. Stop immediately if payment/eligibility cannot be validated.'},
 {id:'russia',num:'08',name:'Russian-speaking Dubai residents',heading:'Dubai Russians: <span class="accent">15 QLs / month.</span>',paid:2200,leads:50,ql:15,
  mix:[['Meta FB/IG',1050],['Google Search',650],['YouTube',300],['Retargeting',200]],
  audiences:'Dubai-based Russian-speaking property investors with verified budgets; geography is UAE, not a broad Russia campaign.',
  outdoor:'Prioritize Dubai broker-office co-branded collateral and a private preview; no costly UAE billboard purchase during pilot.',
  tasks:['Week 1: Russian-language landing page and vetted licensed Dubai broker shortlist.','Month 1: Meta + Google experiments linked to named sales owners in Bitrix24.','Month 2: one Dubai partner preview and qualified Muscat viewing itinerary.'],
  team:'One allocated cross-border closer plus Russian-speaking contract partner; share SDR and CRM capacity.',
  gate:'≥15 qualified / month, CPQL ≤ OMR 147, and at least five attended consultations.'},
 {id:'uae',num:'09',name:'Other UAE expatriates',heading:'UAE expatriates: <span class="accent">25 QLs / month.</span>',paid:3200,leads:100,ql:25,
  mix:[['Meta FB/IG',1300],['Google Search',850],['YouTube',400],['LinkedIn',400],['Retargeting',250]],
  audiences:'Non-overlapping UAE-resident groups for professionals, second-home purchasers and Rove-familiar lifestyle buyers; exclude Russian Dubai cohort from reporting.',
  outdoor:'Use approved co-branded property-agent displays and roadshow collateral. Reserve paid Muscat OOH for combined project awareness.',
  tasks:['Week 1: UAE-specific VISTAL and Rove landing pages with verified ownership terms.','Weeks 2–4: separate VISTAL premium and Rove urban ads, plus Google intent groups.','Month 2: monthly Dubai-to-Muscat investor consultation day and guided virtual tour.'],
  team:'One shared closer allocated to UAE pipeline, 2 SDRs and partner agents; headcount is not additive.',
  gate:'≥25 qualified / month, CPQL ≤ OMR 128; track project-specific reservation rates.'},
 {id:'dach',num:'10',name:'Germany / Austria / Switzerland discovery',heading:'DACH design buyers: <span class="accent">12 QLs / month.</span>',paid:2200,leads:40,ql:12,
  mix:[['Meta FB/IG',850],['Google Search',500],['YouTube',500],['LinkedIn',250],['Retargeting',100]],
  audiences:'German-speaking buyers with cross-border property intent; Swarovski heritage is a storytelling hook, not authorized customer-list access.',
  outdoor:'No German/Austrian/Swiss billboard spend in first 90 days; deploy property-intermediary brochures, private briefings and PR.',
  tasks:['Weeks 1–2: legal-reviewed German VISTAL overview and English/German sales routing.','Month 1: design-led search/video tests and a shortlist of 8–10 licensed intermediaries.','Month 2: two virtual broker briefings; scale only verified buyer conversations.'],
  team:'VISTAL closer plus native German contract translator or accredited partner; no additional full-time closing role initially.',
  gate:'≤ OMR 183 CPQL and partner-origin qualified consultations; pause if language sales support is unavailable.'}
];
function marketPage(m){
 var platformRows=m.mix.map(function(p){return [p[0],money(p[1]),Math.round(p[1]/m.paid*100)+'%'];});
 platformRows.push(['TOTAL',money(m.paid),'100%']);
 var html=h(m.num,m.heading,'Country allocation within a single OMR 11,000 monthly media budget.','Target group: '+m.audiences);
 html+=kpis([['Paid media / month',money(m.paid),'Share of shared pool'],['Raw leads / month',fmt(m.leads),'Illustrative cost per lead: '+money(m.paid/m.leads,1)],['Qualified / month',fmt(m.ql),'Lead-to-QL: '+fmt(m.ql/m.leads*100)+'%'],['CPQL',money(m.paid/m.ql,1),'Paid budget ÷ qualified leads']]);
 html+='<h3 class="exec-sub">Channel deployment</h3>'+table(['Digital platform','Monthly spend','Budget share'],platformRows);
 html+='<div class="exec-grid">'+panel('Outdoor and physical media',list([m.outdoor,'Shared Muscat OOH budget is OMR 3,500/month across BOTH projects; not duplicated here.']))+panel('Sales capacity and buying criteria',list([m.team,'Mark a QL only when reachable, budget-fit, unit-fit, eligible and purchase timing is verified.']))+'</div>';
 html+='<h3 class="exec-sub">30 / 60 / 90-day actions</h3>'+steps([['Build',m.tasks[0]],['Test',m.tasks[1]],['Activate',m.tasks[2]],['Optimize','Review CPQL, consultations, reservations and disqualifications every 7 days.'],['Scale / stop',m.gate]]);
 html+=note(sourceLabel);render(m.id,html);
}
function projectPage(m){
 var html=h(m.num,m.heading,'Product economics • no duplication with country budgets.',m.lede);
 html+=kpis([['Paid media / month',money(m.paid),'From the same OMR 11k pool'],['Leads / month',fmt(m.leads),'Expected blended CPL '+money(m.paid/m.leads,1)],['Qualified / month',fmt(m.ql),'Shared pool split by project'],['CPQL',money(m.paid/m.ql,1),'Planning target only']]);
 html+='<h3 class="exec-sub">Platform spend by product</h3>'+table(['Digital channel','Monthly OMR','Objective'],m.mix.map(function(x){return [x[0],money(x[1]),x[2]];}).concat([['TOTAL',money(m.paid),'Included within the same OMR 11,000 pool']]));
 html+='<div class="exec-grid">'+panel('Digital media and creative',list(m.digital))+panel('Outdoor activation and partnership',list(m.outdoor))+'</div>';
 html+='<h3 class="exec-sub">Deployment milestones</h3>'+table(['Days 1–30','Days 31–60','Days 61–90'],[[m.phase[0],m.phase[1],m.phase[2]]]);
 html+=note('Project allocation = '+money(m.paid)+' and market allocations overlap categorically. Always report the same lead by <strong>one primary project</strong> and <strong>one primary target cohort</strong>. '+sourceLabel);
 render(m.id,html);
}
function boot(){
 var hero=document.getElementById('executive');
 if(hero){
  var d=hero.querySelector('.decision');if(d)d.innerHTML='<small>Chairman’s investment decision</small><strong>Approve a gated OMR 60,000 activation pilot.</strong><p>3 months at OMR 20,000/month, before incremental staffing costs. Release funding in stages based on inventory, approvals and measured qualified demand.</p>';
  var ld=hero.querySelector('.lede');if(ld)ld.textContent='A measurable channel, spend, people and conversion plan for LEO, VISTAL and Rove Home. All figures are pilot assumptions to be validated in Bitrix24.';
  var stats=hero.querySelector('.stat-grid');
  if(stats){stats.outerHTML='<div class="exec-hero">'+kpis([['Total activation / month',money(20000),'OMR 60,000 over 90 days'],['Paid digital / month',money(11000),'330 modeled inbound leads'],['Paid qualified / month','80','Blended CPQL: OMR 137.5'],['90-day reservations','3–6','Conditional working target, not guaranteed']])+'<p class="exec-intro">330 leads → 80 qualified leads per month. 2 SDRs + 3 closers + 2 performance specialists. Incremental staff estimate: OMR 7,600/month; combined cash plan OMR 82,800/90 days excluding partner commissions.</p><div class="exec-call"><a href="#planner">Adjust budget assumptions</a><a href="#conversion">See Bitrix24 and staffing</a></div></div>';}
 }
 render('mandate',h('02','Define the <span class="accent">commercial baseline.</span>','Make the existing customer gap measurable, not anecdotal.','The team has reported an established Europe-based Arab buyer cohort and limited new-market penetration. Validate this against Bitrix24 before making claims.')+
 kpis([['CRM audit','30 days','Reconcile past sources and booked units'],['Target markets','5','India, Farsi-speaking, Russian Dubai, UAE, DACH'],['Pilot period','90 days','Measured gated launch'],['Non-negotiable','1 CRM','Bitrix24 as lead and deal record']])+
 '<div class="exec-grid">'+panel('Data required before spending',list(['Available units, prices, payment plans, approvals, expected handover and sales commission by project.','Last 12 months: lead source, country, cost, contact rate, appointments, reservations, SPAs and cancellation rates.','Legal sign-off on project ownership claims and on each target market.']))+
 panel('Existing buyers are not a growth forecast',list(['Protect the established Europe-based Arab buyer channel as business-as-usual.','Do not publish identities or purchase history without consent.','Allocate media by verified purchase ability, not nationality alone.']))+'</div>'+note('All incremental conversion and revenue numbers in this briefing are assumptions until reconciled against Bitrix24.'));
 render('architecture',h('03','One developer. <span class="accent">Two product funnels.</span>','Project allocations sum to OMR 11,000 digital spend per month.','LEO runs reputation, trust, outdoor visibility and commercial relationships; VISTAL and Rove Home run separate measurable paid-conversion funnels.')+
 kpis([['VISTAL media / mo',money(6600),'60% of paid pool'],['Rove media / mo',money(4400),'40% of paid pool'],['Shared outdoor media',money(3500),'All-project visibility budget'],['Total paid leads','330 / mo','160 VISTAL + 170 Rove']])+
 table(['Product','Monthly paid spend','Raw leads','Qualified','CPQL','Project positioning'],[['VISTAL',money(6600),'160','43',money(6600/43,1),'Premium design-led waterfront purchase'],['Rove Home',money(4400),'170','37',money(4400/37,1),'Connected, furnished urban living'],['TOTAL',money(11000),'330','80',money(137.5,1),'One combined acquisition engine']])+
 note('The five-country budgets also sum to OMR 11,000. They are a SECOND VIEW of the identical spend, not another OMR 11,000.'));
 projectPage({id:'vistal',num:'04',heading:'VISTAL: <span class="accent">43 qualified / month.</span>',paid:6600,leads:160,ql:43,
 mix:[['Meta IG/FB',2800,'Premium buyer demand and conversion'],['Google Search',1700,'High-intent waterfront research'],['YouTube',950,'Design-led proof and nurture'],['LinkedIn',400,'Qualified affluent professionals'],['Retargeting',750,'Visited premium inventory and completed form initiations']],
 lede:'Luxury/architectural storytelling with verification of premium buyer intent. Avoid reliance on celebrity or Swarovski corporate endorsement claims.',
 digital:['Meta IG/FB: premium creative and lead-to-consultation tests, not broad reach only.','Google Search: branded-residence/waterfront property intent; YouTube design films for consideration.','English, Arabic, German and Russian material only after approval; each asset uses campaign IDs and Bitrix tracking.'],
 outdoor:['Use quoted premium-mall digital screens and approved luxury-lifestyle venue displays from the shared OMR 3,500 monthly OOH pool. Large roadside billboards are outside this pilot budget.','One invitation-only design salon per 60 days funded from shared events allocation.','Private broker introductions and approved brand partnerships rather than celebrity-guest assumptions.'],
 phase:['Approve factsheet, approved visual rights, units and 3 sales scripts; build project-specific lead forms.','Go live with 4 creative variants + 2 landing pages; conduct private salon; audit QL quality weekly.','Move spend toward the best two geographies and at least two partners producing genuine reservations.']});
 projectPage({id:'rove',num:'05',heading:'Rove Home: <span class="accent">37 qualified / month.</span>',paid:4400,leads:170,ql:37,
 mix:[['Meta IG/FB',2050,'Furnished urban lifestyle and viewings'],['Google Search',1500,'Muscat apartment ownership intent'],['YouTube',250,'Project footage and proof'],['LinkedIn',450,'Working professionals in UAE/Oman'],['Retargeting',150,'Qualified visitor follow-ups']],
 lede:'Urban-lifestyle housing aimed at practical ownership use cases. Claims about yields, services, furnishing and occupancy must match approved project facts.',
 digital:['Meta IG/FB: apartment lifestyle, amenities and commute accessibility; separate resident and investor audiences.','Google Search: Muscat apartment and ownership intent; YouTube/Meta retargeting using actual approved project material.','Two project-specific landing paths: Rove-familiar UAE expats and Oman-based buyers.'],
 outdoor:['Use mall or retail digital screens and approved co-branded displays from the shared OMR 3,500 monthly OOH budget. Do not assume roadside billboard inventory at these rates.','Use brokers for Dubai preview material; do not imply access to hotel guest databases.','One cross-border broker briefing each month from existing partnerships/events budget.'],
 phase:['Obtain approved unit/price/inventory information, furnished specification and FAQs.','Launch dual landing pages; recruit 6 qualified UAE/Muscat broker partners; review CPQL by motive.','Prioritize partner and Search-origin opportunities entering proposal or booking stages.']});
 markets.forEach(marketPage);
 render('visibility',h('11','LEO visibility: <span class="accent">OMR 3,500 outdoor.</span>','Brand media is a measured support system, not a substitute for sales-qualified demand.','Use LEO proof, project credentials and verified delivery information, with a single tracked path to project sales.')+
 kpis([['Muscat outdoor',money(3500)+'/mo','Two mall screens + two vehicle placements (illustrative)'],['Paid video within pool',money(1200)+'/mo','YouTube; already inside paid media'],['Earned/partner activity','4 pitches / mo','Internal action target'],['Attribution','100% QR/UTM','Unique source code by placement']])+
 table(['Outdoor format','Illustrative monthly cap','Required measurement'],[['Mall digital screen / network A',money(1500),'Unique short URL, tagged QR; quoted media-owner inventory'],['Mall digital screen / network B',money(1200),'Location-specific landing page and QR'],['Two vehicle / taxi placements',money(800),'Two unique source codes, approved placement and consent'],['TOTAL',money(3500),'All figures conditional on written Oman quotes, permits and production costs']])+
 '<div class="exec-grid">'+panel('What the internal team actually does',list(['Film 2 leadership/project-proof reels per month and issue 4 targeted media pitches.','Secure 2 project-specific co-marketing partners per month; get contractual and brand approval.','Track branded search interest and QR-sourced consultations; do not equate QR scans with all outdoor-driven demand.']))+
 panel('Approval and optimization',list(['Get at least three current media-owner quotes showing venue/asset, campaign duration, screen frequency, printing, production, installation and permits.','Keep one identical brand proof pack; VISTAL and Rove retain separate CTAs.','Evaluate tagged site visits, qualified enquiries and brand-search lift after 30–60 days, accounting for low outdoor attribution coverage.']))+'</div>'+
 note('Published Muscat outdoor-advertising guides quote roadside billboards at several thousand OMR per month. This OMR 3,500 pilot instead proposes lower-cost mall digital and vehicle formats, subject to genuine, comparable media-owner quotations. Reach, sales and bookings are not guaranteed.'));
 render('alliances',h('12','Partnership network: <span class="accent">12 recruited.</span>','Partner referrals are separate from paid digital lead estimates.','Use signed permission-based referral arrangements and source IDs for every partner.')+
 kpis([['New broker introductions','12 / 90d','Licensed and verified'],['Activated partners','6 / 90d','At least one qualified conversation'],['Partner QLs','8–12 / mo','Stretch test, excluded from 80 paid QLs'],['Owner','1 partnerships lead','Shared headcount plan']])+
 table(['Partner group','90-day target','Offer / activation','CRM proof'],[['UAE licensed brokers','5','Dubai private previews + co-branded kits','Referral ID and broker split'],['Oman business communities','4','Muscat investor briefings','Event ID and contact consent'],['DACH premium property advisers','3','German VISTAL fact sheet and virtual briefing','Named referral path'],['TOTAL','12','6 live by day 90','Source-to-SPA report']])+
 note('Referral commissions are excluded from the OMR 20,000 activation ceiling until rates and sale economics are approved. No scraped customer registries or third-party guest lists.'));
 render('events',h('13','Events: <span class="accent">2 activations / month.</span>','Fund with OMR 2,500/month already in total budget.','Small qualified discussions beat mass attendance; partner venue support may be necessary.')+
 kpis([['Event allocation',money(2500)+'/mo','Shared budget'],['Activations','2 / mo','Muscat + broker-led Dubai / virtual'],['Attendance','20–30 / mo','RSVP and show-up targets'],['Event qualified','6–10 / mo','Supplemental, not paid QLs']])+
 table(['Activation','Monthly planning envelope','Commercial discipline'],[['Muscat investor briefing',money(1000),'10–15 pre-screened prospects; lead ID at RSVP'],['Dubai broker/private preview',money(1500),'10–15 relevant attendees or partner-hosted virtual hybrid'],['TOTAL',money(2500),'All qualified leads must be event-tagged in Bitrix24']])+
 note('Event-only CPQL if 6–10 event-qualified leads emerge: OMR 250–417. This is an all-in event allocation estimate, not a claimed historical result. Full expense coding is mandatory.'));
 render('conversion',h('14','Bitrix24: <span class="accent">lead-to-SPA accountability.</span>','Sales and marketing use one pipeline with named owners.','Two SDRs work intake across all audiences; three project/cross-border closers take qualified opportunities. Language coverage is shared or contract-based.')+
 kpis([['Inside sales / SDR','2','Split ~330 inbound leads monthly'],['Property closers','3','Average 27 paid QLs each / month'],['First response','≤5 min','Business-hours operating SLA target'],['CRM integrity','≥95%','Complete primary source + campaign IDs']])+
 steps([['Capture','Meta Lead Ads + landing forms + Google lead paths with consent and UTM.'],['Route','Deduplicate; assign by project, preferred language, buyer geography and workload.'],['Qualify','Budget, unit fit, ownership eligibility, funding and purchase window.'],['Progress','Consultation → viewing → proposal → reservation → SPA.'],['Optimize','Export spend/QL/reservation by platform, project, cohort and salesperson.']])+
 '<div class="exec-grid">'+panel('Integration and required fields',list(['Create Instant Forms in Meta, then connect them through Bitrix24 Facebook Lead Ads or an approved integration; submit end-to-end test leads before launch.','Capture utm_source, utm_medium, utm_campaign, utm_content, utm_term, campaign/ad IDs, GCLID/FBCLID if available, landing page, consent timestamp and event/QR/partner ID.','Required fields: project, preferred language, country of residence, unit preference, verified budget range, intent, contact attempt, qualification result, broker ID and assigned closer.','Reconcile ad-platform conversion events with CRM stages; prevent duplicate conversions and ensure approved privacy handling.']))+
 panel('Lead governance and escalation',list(['Contact SLA: 5 min in working hours; out-of-hours immediate acknowledgment and next-shift call.','Day 0: call + WhatsApp only with lawful consent; day 1/3/7 follow-up tasks and escalation.','Bitrix workflows: unassigned lead > 10 min alert, uncontacted lead > 2h escalation, QL > 24h without appointment task alert.','Daily SDR queue, weekly CPQL by source, monthly reservation and SPA attribution; finance validates signed revenue.']))+'</div>'+
 note('Bitrix24 documents Facebook Lead Ads connection and Sales Intelligence UTM setup. Form availability, WhatsApp connection, plan entitlements and field mappings still require an end-to-end account-specific test.'));
 render('campaigns',h('15','Operating team: <span class="accent">2 performance specialists.</span>','Incremental payroll estimate is separate from campaign activation.','Lean shared core team; projects and audiences do not each receive their own separate headcount.')+
 kpis([['Performance buyers','2 FTE','Meta/social + Search/video'],['Salespeople','5 FTE','2 SDRs + 3 closers'],['Other support','2.5 FTE + retainer','Creative, events, CRM and language'],['Monthly staffing',money(7600),'Illustrative incremental payroll/contractors']])+
 table(['Resource','Capacity','Modeled monthly OMR','Primary accountability'],[['Paid Social specialist','1 FTE',money(750),'Meta targeting, experimentation, CPQL'],['Search & video specialist','1 FTE',money(750),'Google, YouTube, attribution'],['Creative/content producer','1 FTE',money(900),'Approved project creatives, translations coordination'],['Partnerships + events','1 FTE',money(800),'Broker activation, PR, owned events'],['Bitrix CRM / reporting','0.5 FTE',money(600),'Workflow, clean data, dashboard, integration QA'],['SDR / lead qualification','2 FTE',money(900),'Speed-to-lead, qualification and appointments'],['Property sales closers','3 FTE',money(2400),'Consultations, viewings, reservations and SPA'],['Language translation / partner retainer','Shared',money(500),'Farsi, Russian, German as approved'],['TOTAL','9.5 FTE + retainer',money(7600),'Existing senior marketing lead excluded']])+
 '<h3 class="exec-sub">Consolidated digital allocation</h3>'+table(['Platform','OMR / month','Primary purpose'],platforms)+
 note('Salary and retainer figures are illustrative budgeting placeholders, not verified Muscat market salary data. Existing employees, agency retainers, benefits, visas, commissions and broker referral fees may change the incremental budget materially.'));
 render('planner',h('16','Interactive <span class="accent">pilot economics.</span>','Change the core assumptions and inspect what they imply.','This calculator is a scenario tool, not a statement of actual LEO performance or a guaranteed pipeline.')+
 '<div class="exec-grid"><div class="exec-panel"><div class="exec-label">Edit assumptions • OMR / month unless stated</div>'+
 [['pmSpend','Digital paid media','3000','20000','500','11000','OMR'],['pmCpl','Raw cost per lead','15','100','0.01','33.33','OMR'],['pmRate','Qualified share (%)','10','50','0.01','24.24','%'],['pmBook','90-day QL-to-reservation (%)','0','8','0.5','2','%']].map(function(r){return '<div class="exec-field"><label for="'+r[0]+'">'+r[1]+' <output id="'+r[0]+'Label"></output></label><input type="range" id="'+r[0]+'" min="'+r[2]+'" max="'+r[3]+'" step="'+r[4]+'" value="'+r[5]+'"></div>';}).join('')+
 '</div><div class="exec-panel"><div class="exec-label">Live funnel and investment</div><div id="pmResults" aria-live="polite"></div><p>Non-paid activation: OMR 9,000/month fixed in this scenario. Estimated incremental staffing: OMR 7,600/month, excluded from activation spend.</p></div></div>'+
 note('Formula: raw leads = paid spend ÷ raw CPL; paid QLs = leads × qualification%; CPQL = paid spend ÷ QLs; 90-day reservations = 3 × QLs × assumed reservation rate. Booking estimates are fractional expectations, not promises. Payroll is shown separately.'));
 render('roadmap',h('17','90-day delivery: <span class="accent">gates and owners.</span>','Budget ceiling OMR 60,000 before payroll; stage releases depend on validation.','Do not commit the full 90-day media budget before approvals, lead capture testing, and sales capacity are ready.')+
 kpis([['Days 1–30','Setup + baseline','Approve proof, forms, CRM and staffing'],['Days 31–60','Test + screen','Run at most 5 geographic cohorts'],['Days 61–90','Scale / stop','Cut weak QL sources, add converting partners'],['Total activation ceiling',money(60000),'OMR 20k × 3 months']])+
 table(['Window','Measurable deliverables','Responsible','Decision gate'],[['1–30 days','Two project landing pages; five cohort codes; end-to-end CRM QA; 12 approved creatives; at least three OOH quotes','Marketing + CRM + legal','No launch without eligibility, inventory and consent language'],['31–60 days','≥160 paid QLs cumulatively if full media funded; 2–4 events; >=4 partners activated','2 paid specialists + 2 SDRs + 3 closers','Stop sources >1.5× CPQL target with weak meeting rate'],['61–90 days','≥240 paid QLs cumulatively if fully funded; 6 activations; 3–6 conditional reservations','Marketing manager + CRO + finance','Reinvest only in source→consultation→booking pathways']])+
 note('Cumulative QL targets presume full 30-day paid-media flight in each month. Staged startup, slow approvals or compliance holds reduce achievable totals and must be reforecast rather than relabeled as performance failures.'));
 render('governance',h('18','Chairman’s <span class="accent">weekly scorecard.</span>','Decision-led metrics, not impressions alone.','One Bitrix24 source-of-truth report by project, residence-market cohort, campaign, sales owner and salesperson.')+
 table(['KPI','90-day working target','Review owner','Action trigger'],[['Paid qualified leads','80 / month; 240 across 90 days','Performance + CRM','Audit if <60 after ramp'],['Paid CPQL',money(137.5)+' blended','Paid specialists','Cut source if >1.5× target for 2 review weeks'],['Contact SLA','≥90% contacted in working hours within 5 min','SDR lead','Escalate late/unassigned leads'],['Consultations held','~30–35 / month planning range','Sales lead','Fix qualification and scheduling if <25'],['Reservations','3–6 in 90 days, subject to inventory','CRO + finance','Reforecast if pipeline unready'],['Source tagging','≥95% complete; 0 uncoded SPAs','CRM lead','Fix integrations immediately'],['OOH + event proof','Each placement/event has QR or partner ID','Partnerships lead','Review exposure and tagged response before renewal'],['Revenue/ROAS','Only verified signed SPA values','Finance + CRO','Never claim ROAS from lead volume alone']])+
 note('Forecast ≠ actual. Weekly update should include spend, qualified leads, attended meetings, proposals, reservations, SPAs, cancellations, and next action for each cohort.'));
 var sources=document.getElementById('sources');
 if(sources){
  var si=sources.querySelector('.section-inner');
  var newSources='<div class="exec-panel" style="margin:22px 0"><div class="exec-label">New pricing and CRM references • external planning checks, 04 Nov 2026</div>'+
  list(['<a class="exec-link" target="_blank" rel="noopener" href="https://outdooradvertisinguae.com/outdoor-ooh-advertising-muscat-oman/">Muscat OOH indicative placement prices</a>: published roadside billboard estimates exceed this pilot budget. Mall digital and vehicle formats are more plausible, but written media-owner quotations are required.',
  '<a class="exec-link" target="_blank" rel="noopener" href="https://madaralbader.com/guides/social-media-ads-cost-oman">Oman digital ad price and Google CPC guide (13 Oct 2026)</a>: general Oman search-price estimates are not evidence of luxury-property lead costs or CPQL.',
  '<a class="exec-link" target="_blank" rel="noopener" href="https://helpdesk.bitrix24.com/open/22869430/">Bitrix24: Google/Facebook UTM and cost attribution (Oct 2026)</a>.',
  '<a class="exec-link" target="_blank" rel="noopener" href="https://helpdesk.bitrix24.com/open/21498798">Bitrix24: connect sources and UTM-tagged CRM leads (Oct 2026)</a>.',
  '<a class="exec-link" target="_blank" rel="noopener" href="https://helpdesk.bitrix24.com/open/20838876/">Bitrix24: Facebook Lead Ads integration (updated Oct 2026)</a>: create Meta Instant Forms before connecting them to Bitrix24.',
  'All paid CPL, qualification rates, reservations, payroll rates and lead targets on this page are internal test assumptions, not external market facts.'])+'</div>';
  si.insertAdjacentHTML('beforeend',newSources);
  var fine=si.querySelector('.fine');if(fine)fine.textContent='Research snapshot: 04 November 2026. Third-party rate cards vary by geography, inventory and inventory timing. Media contracts, legal/brand permissions, pricing, ownership eligibility and data-processing terms require separate written approval.';
 }
 var footer=document.querySelector('.footer');if(footer)footer.innerHTML='<span>LEO Development / Chairman’s Quantified Growth Plan</span><span>04 Nov 2026 • Pilot assumptions • Prepared by LEO Marketing</span>';
 function updatePlanner(){
  var get=function(id){return Number(document.getElementById(id).value);};
  var spend=get('pmSpend'),cpl=get('pmCpl'),rate=get('pmRate'),book=get('pmBook');
  var leads=spend/cpl,ql=leads*rate/100,cpql=ql?spend/ql:0;
  [['pmSpend','OMR '+fmt(spend)],['pmCpl','OMR '+fmt(cpl,2)],['pmRate',fmt(rate,1)+'%'],['pmBook',fmt(book,1)+'%']].forEach(function(x){document.getElementById(x[0]+'Label').textContent=x[1];});
  document.getElementById('pmResults').innerHTML=kpis([['Raw leads / mo',fmt(leads),'Paid spend ÷ raw CPL'],['Qualified / mo',fmt(ql),'Lead quality assumption'],['Paid CPQL',money(cpql,1),'Cost / qualified lead'],['Reservations / 90d',fmt(ql*3*book/100,1),'At selected assumption']])+
  rows([['Monthly activation',money(spend+9000)],['90-day activation',money((spend+9000)*3)],['Monthly staffing (additional)',money(7600)],['90-day activation + staffing',money((spend+9000+7600)*3)],['Activation cost per reservation',ql*book?money(((spend+9000)*3)/(ql*3*book/100)): 'N/A'],['All-in cost per reservation',ql*book?money(((spend+9000+7600)*3)/(ql*3*book/100)): 'N/A']]);
 }
 ['pmSpend','pmCpl','pmRate','pmBook'].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener('input',updatePlanner);});
 updatePlanner();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
})();