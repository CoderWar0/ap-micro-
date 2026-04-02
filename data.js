// ══════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════

const UNIT_NAMES = {
  1:"Basic Economic Concepts",
  2:"Supply & Demand",
  3:"Production, Cost & Perfect Competition",
  4:"Imperfect Competition",
  5:"Factor Markets",
  6:"Market Failure & Gov't"
};
const UNIT_WEIGHTS = { 1:"8–14%", 2:"20–30%", 3:"25–35%", 4:"15–22%", 5:"10–13%", 6:"8–13%" };
const UNIT_ICONS = { 1:"🌐", 2:"⚖️", 3:"🏭", 4:"🏢", 5:"👷", 6:"🏛️" };
const UNIT_COLORS = { 1:"u1", 2:"u2", 3:"u3", 4:"u4", 5:"u5", 6:"u6" };

const UNIT_CONCEPTS = {
  1: ["Scarcity, trade-offs & opportunity cost","Production Possibilities Curve (PPC)","Absolute vs. comparative advantage","Specialization & trade","Economic systems & incentives","Marginal analysis & rational decision-making"],
  2: ["Law of demand & demand shifters","Law of supply & supply shifters","Market equilibrium & disequilibrium","Price elasticity of demand (PED)","Price elasticity of supply (PES)","Income & cross-price elasticity","Consumer & producer surplus","Price floors & price ceilings"],
  3: ["Production function: TP, MP, AP","Short-run costs: FC, VC, TC, AFC, AVC, ATC, MC","Long-run costs: economies & diseconomies of scale","Profit maximization: MR = MC","Short-run shutdown rule: P < AVC","Long-run: P = minimum ATC (zero profit)","Normal vs. economic profit"],
  4: ["Monopoly: downward-sloping demand, MR < P","Natural monopoly & government regulation","Monopolistic competition: differentiated products","Short-run monopolistic profit vs. long-run zero profit","Oligopoly & game theory basics","Nash Equilibrium, dominant strategies","Price discrimination"],
  5: ["Derived demand for labor","Marginal Revenue Product (MRP) = demand for labor","Marginal Factor Cost (MFC) = supply of labor","Profit maximization: MRP = MFC (or MRC)","Monopsony: single buyer of labor","Minimum wage effects on labor market","Physical capital & loanable funds market"],
  6: ["Negative & positive externalities","Deadweight loss from externalities","Corrective taxes (Pigouvian) & subsidies","Public goods: non-excludable & non-rival","Free-rider problem","Asymmetric information: adverse selection & moral hazard","Government policies: taxes, quotas, regulations"]
};

const allMCQ = [
  // UNIT 1
  {id:1,unit:1,diff:"easy",q:"A country can produce either 100 units of wheat or 50 units of cloth. Another country can produce either 80 units of wheat or 60 units of cloth. Which country has a comparative advantage in cloth production?",choices:["The first country, because it produces more wheat","The second country, because it gives up less wheat per unit of cloth","Both countries have a comparative advantage in cloth","Neither country has a comparative advantage in cloth"],correct:1,explain:"Comparative advantage is determined by opportunity cost. Country 1 gives up 2 wheat per cloth (100/50). Country 2 gives up 1.33 wheat per cloth (80/60). Country 2 has a lower opportunity cost of cloth, so it has the comparative advantage."},
  {id:2,unit:1,diff:"easy",q:"A country is producing inside its Production Possibilities Curve. This most likely indicates:",choices:["Full employment of all resources","A technological advancement","Unemployed or underutilized resources","An economic gain from trade"],correct:2,explain:"A point inside the PPC means the economy is not using all its available resources efficiently — some resources are unemployed or underutilized."},
  {id:3,unit:1,diff:"medium",q:"If the United States and Canada both gain from trade, it is because each country:",choices:["Has an absolute advantage in the good it exports","Specializes according to comparative advantage","Produces more than it can consume","Has equal opportunity costs"],correct:1,explain:"Mutual gains from trade arise when each country specializes in producing the good in which it has a comparative advantage (lower opportunity cost), regardless of absolute advantage."},
  {id:4,unit:1,diff:"medium",q:"The law of increasing opportunity cost explains why the PPC is:",choices:["A straight line","Bowed inward toward the origin","Bowed outward (concave to origin)","A vertical line"],correct:2,explain:"As a country produces more of one good, it must use resources progressively less suited for that production, increasing the opportunity cost. This causes the PPC to bow outward (concave to the origin)."},
  {id:5,unit:1,diff:"hard",q:"A rational consumer will continue purchasing a good as long as:",choices:["Total utility is positive","Marginal utility exceeds the price of the good","Total utility is increasing","Marginal cost exceeds marginal benefit"],correct:1,explain:"Rational consumers equate marginal benefit (marginal utility) to marginal cost (price). They continue consuming until MB = MC, meaning they purchase as long as marginal utility ≥ price."},
  {id:6,unit:1,diff:"easy",q:"Which of the following best illustrates a trade-off?",choices:["A student gets a full-tuition scholarship","A government uses tax revenue to build a new highway instead of funding schools","A firm earns economic profit","A consumer buys a good at its equilibrium price"],correct:1,explain:"A trade-off involves giving up one thing to get another. Choosing highways over schools is a direct trade-off of government resources between two competing uses."},
  {id:7,unit:1,diff:"medium",q:"Technological progress in an economy producing only wheat and steel would most likely cause the PPC to:",choices:["Shift inward","Rotate outward for wheat only","Shift outward for both goods","Rotate inward for steel only"],correct:2,explain:"A general technological improvement increases the productive capacity for all goods, shifting the entire PPC outward, representing economic growth."},
  {id:8,unit:1,diff:"hard",q:"Country A can produce 20 cars or 40 tons of rice. Country B can produce 10 cars or 30 tons of rice. Which statement is correct?",choices:["Country A has a comparative advantage in rice","Country B has a comparative advantage in rice","Country A should produce both goods since it has absolute advantage in both","Neither country should specialize"],correct:1,explain:"Country A's opportunity cost of rice = 0.5 cars. Country B's opportunity cost of rice = 0.33 cars. Country B has a lower OC of rice, so it has comparative advantage in rice. Country A has comparative advantage in cars."},
  {id:9,unit:1,diff:"easy",q:"The concept of scarcity in economics refers to:",choices:["Goods that are very expensive","The limited nature of society's resources relative to unlimited wants","Goods that are only available in certain countries","The physical rarity of natural resources"],correct:1,explain:"Scarcity is the fundamental economic problem: society has unlimited wants but limited resources (land, labor, capital, entrepreneurship), forcing trade-offs and choices."},
  {id:10,unit:1,diff:"medium",q:"Which factor would cause an outward shift of only one axis intercept on a PPC?",choices:["A general technological improvement in all industries","Discovery of new resources useful for only one good","An increase in consumer demand for one good","A decrease in the labor force"],correct:1,explain:"If new resources or technology improve production of only one good, only that good's axis intercept shifts outward, causing the PPC to rotate rather than shift uniformly."},
  {id:11,unit:1,diff:"medium",q:"Which factor would cause an outward shift of only one axis intercept on a PPC?",choices:["A general technological improvement in all industries","Discovery of new resources useful for only one good","An increase in consumer demand for one good","A decrease in the labor force"],correct:1,explain:"If new resources or technology improve production of only one good, only that good's axis intercept shifts outward, causing the PPC to rotate rather than shift uniformly."},

  // UNIT 2
  {id:11,unit:2,diff:"easy",q:"If the price of a substitute good increases, what happens to the demand for the original good?",choices:["Demand decreases","Demand increases","Demand is unchanged","Supply increases"],correct:1,explain:"If the price of a substitute rises, consumers switch to the original good because it is now relatively cheaper. This increases demand (shifts the demand curve right)."},
  {id:12,unit:2,diff:"easy",q:"A price floor set above equilibrium will result in:",choices:["A shortage","A surplus","No change in the market","A decrease in supply"],correct:1,explain:"A price floor above equilibrium means the legal minimum price is above the market-clearing price. At that higher price, quantity supplied exceeds quantity demanded, creating a surplus."},
  {id:13,unit:2,diff:"medium",q:"The price elasticity of demand for a good is –2.5. If price rises by 10%, quantity demanded will:",choices:["Rise by 25%","Fall by 25%","Fall by 2.5%","Rise by 2.5%"],correct:1,explain:"PED = % change in Qd / % change in P. Rearranging: % change in Qd = PED × % change in P = –2.5 × 10% = –25%. Quantity demanded falls by 25%."},
  {id:14,unit:2,diff:"medium",q:"If a good has a price elasticity of demand of –0.4, demand is:",choices:["Elastic","Inelastic","Unit elastic","Perfectly elastic"],correct:1,explain:"When |PED| < 1 (here |–0.4| = 0.4 < 1), demand is inelastic — consumers are relatively unresponsive to price changes."},
  {id:15,unit:2,diff:"hard",q:"A government imposes a $2 per unit tax on sellers. Which of the following is true when demand is more elastic than supply?",choices:["Consumers bear a larger share of the tax burden","Producers bear a larger share of the tax burden","The tax burden is split equally","The entire burden falls on consumers"],correct:1,explain:"The party with the more inelastic (less elastic) curve bears a greater share of the tax burden. If demand is more elastic than supply, supply is more inelastic, so producers bear the larger burden."},
  {id:16,unit:2,diff:"medium",q:"An increase in consumer income causes demand for an inferior good to:",choices:["Increase","Decrease","Remain unchanged","Become perfectly inelastic"],correct:1,explain:"An inferior good is one for which demand falls as income rises. As income increases, consumers shift away from inferior goods toward normal goods."},
  {id:17,unit:2,diff:"easy",q:"Which of the following would cause the supply curve for corn to shift to the right?",choices:["An increase in the price of corn","A decrease in the number of corn farms","An improvement in corn harvesting technology","An increase in consumer income"],correct:2,explain:"A technological improvement reduces production costs, allowing firms to supply more at any given price, shifting the supply curve to the right. Price changes cause movement along the supply curve, not a shift."},
  {id:18,unit:2,diff:"hard",q:"Total revenue increases when price increases. This means:",choices:["Demand is elastic","Demand is inelastic","Demand is unit elastic","Supply is inelastic"],correct:1,explain:"When demand is inelastic (|PED| < 1), a price increase causes a smaller percentage decline in quantity, so total revenue (P × Q) increases. TR and P move in the same direction when demand is inelastic."},
  {id:19,unit:2,diff:"medium",q:"Consumer surplus is the difference between:",choices:["The market price and the minimum price producers will accept","The price consumers are willing and able to pay and the price they actually pay","Total revenue and total cost","The price floor and the equilibrium price"],correct:1,explain:"Consumer surplus = the maximum a consumer is willing to pay (MB) minus the actual market price paid. It represents the net benefit consumers receive from buying at the market price."},
  {id:20,unit:2,diff:"hard",q:"Cross-price elasticity of demand is positive between two goods. This indicates the goods are:",choices:["Complements","Substitutes","Normal goods","Inferior goods"],correct:1,explain:"Positive cross-price elasticity means when the price of one good rises, demand for the other rises — consistent with substitutes. A price increase for one causes consumers to buy more of the other."},
  {id:21,unit:2,diff:"medium",q:"A price ceiling set below equilibrium will result in:",choices:["A surplus","A shortage","Higher prices","Decreased demand"],correct:1,explain:"A binding price ceiling (below equilibrium) caps the price below where quantity supplied equals quantity demanded. At that lower price, Qd > Qs, creating a shortage."},
  {id:22,unit:2,diff:"medium",q:"Which of the following goods is most likely to have inelastic demand?",choices:["Luxury sports cars","Insulin for diabetics","Vacation cruises","Designer handbags"],correct:1,explain:"Goods with few or no substitutes (necessities like insulin), tend to have inelastic demand. Consumers must purchase them regardless of price changes, making them unresponsive to price increases."},

  // UNIT 3
  {id:23,unit:3,diff:"easy",q:"A firm should shut down in the short run if:",choices:["Its total revenue is less than its total cost","Its price is less than its average variable cost","Its marginal cost exceeds its marginal revenue","Its average total cost exceeds its average variable cost"],correct:1,explain:"A firm should shut down in the short run when P < AVC (or TR < TVC) because it cannot cover even its variable costs. Fixed costs are sunk in the short run."},
  {id:24,unit:3,diff:"easy",q:"Which cost is always zero in the long run?",choices:["Variable cost","Marginal cost","Fixed cost","Average total cost"],correct:2,explain:"In the long run, all inputs are variable — no costs are fixed. Fixed costs exist only in the short run because at least one input cannot be changed."},
  {id:25,unit:3,diff:"medium",q:"A perfectly competitive firm is earning economic profit in the short run. In the long run, what will happen?",choices:["New firms will enter, increasing supply and driving price down to ATC","Firms will exit, decreasing supply and driving price up","The firm will become a monopoly","The government will regulate the price"],correct:0,explain:"Economic profit attracts new entrants in competitive markets. As firms enter, supply increases, price falls, and economic profit is eliminated until P = ATC (zero economic profit) in the long run."},
  {id:26,unit:3,diff:"medium",q:"Average total cost is minimized where:",choices:["ATC equals AFC","ATC equals MC","MC equals AVC","TC is at its minimum"],correct:1,explain:"ATC is minimized at the point where the MC curve intersects the ATC curve from below. When MC < ATC, ATC is falling; when MC > ATC, ATC is rising."},
  {id:27,unit:3,diff:"hard",q:"In the short run, if a firm's price equals its average total cost but exceeds its average variable cost, the firm is:",choices:["Earning economic profit and will expand","Breaking even economically and should stay in business","Making a loss equal to its fixed costs","In the shutdown zone"],correct:1,explain:"If P = ATC, total revenue exactly covers total costs, including a normal profit. The firm earns zero economic profit (accounting profit includes normal return). It should stay open since all costs are covered."},
  {id:28,unit:3,diff:"medium",q:"In a perfectly competitive market, a firm is a price taker because:",choices:["It has significant market power","Its output is so small relative to the market that it cannot affect price","The government sets the price","All firms in the market collude on price"],correct:1,explain:"In perfect competition, individual firms produce such a small fraction of total market output that their production decisions have no measurable effect on the market price, making them price takers."},
  {id:29,unit:3,diff:"hard",q:"Which of the following is true when a firm's marginal product of labor is at its maximum?",choices:["Average product of labor is also maximized","Marginal product equals average product","Marginal cost is minimized","Total product is maximized"],correct:2,explain:"When MP is maximized, MC is minimized, because MC = wage/MP (or input price/MP). As MP rises, MC falls; MC is lowest when MP is highest."},
  {id:30,unit:3,diff:"medium",q:"Economies of scale occur when:",choices:["Output increases but average total cost rises","Long-run average total cost decreases as output increases","Marginal cost falls below average variable cost","Fixed costs are eliminated"],correct:1,explain:"Economies of scale exist when increasing output leads to a decrease in long-run average total cost (LRATC), often due to specialization, bulk purchasing, or more efficient use of large-scale capital."},
  {id:31,unit:3,diff:"easy",q:"For a profit-maximizing firm, production should occur where:",choices:["Total revenue is maximized","Marginal revenue equals marginal cost","Average total cost is minimized","Total profit is zero"],correct:1,explain:"The profit-maximization rule for all firms is MR = MC. Producing at this output level maximizes the difference between total revenue and total cost."},
  {id:32,unit:3,diff:"hard",q:"A firm's total fixed cost is $500, and at its current output, AVC = $8 and ATC = $13. What is total output?",choices:["50 units","100 units","62.5 units","125 units"],correct:1,explain:"AFC = ATC – AVC = $13 – $8 = $5. AFC = TFC / Q → Q = TFC / AFC = $500 / $5 = 100 units."},

  // UNIT 4
  {id:33,unit:4,diff:"easy",q:"A monopolist's marginal revenue is:",choices:["Equal to price","Greater than price","Less than price","Equal to average revenue"],correct:2,explain:"A monopolist faces a downward-sloping demand curve. To sell an additional unit, it must lower the price on all units. Thus MR < P for all units beyond the first."},
  {id:34,unit:4,diff:"medium",q:"Compared to a perfectly competitive market, a monopoly produces:",choices:["A higher quantity and a lower price","A lower quantity and a higher price","The same quantity but a higher price","A higher quantity and a higher price"],correct:1,explain:"A monopolist restricts output (produces less) and charges a higher price than would exist under perfect competition in order to maximize profit, creating deadweight loss."},
  {id:35,unit:4,diff:"medium",q:"A natural monopoly exists because:",choices:["The government grants an exclusive license to one firm","A single firm can supply the entire market at a lower average cost than multiple firms","The firm has patented its production process","One firm controls all natural resources"],correct:1,explain:"A natural monopoly occurs when a single firm's LRATC is still declining as it serves the entire market — it results from very large economies of scale relative to market size."},
  {id:36,unit:4,diff:"medium",q:"In the long run, a monopolistically competitive firm earns:",choices:["Economic profit due to product differentiation","Normal profit (zero economic profit)","A loss equal to its fixed costs","Monopoly profit"],correct:1,explain:"Monopolistic competition allows free entry and exit. Entry by new firms attracted by short-run profits drives each firm's demand curve inward until P = ATC and economic profit = 0 in the long run."},
  {id:37,unit:4,diff:"hard",q:"Which of the following is a condition for successful price discrimination?",choices:["The firm must be a price taker","The firm must be able to segment markets with different elasticities and prevent resale","The firm must produce where P = MC","The good must have many close substitutes"],correct:1,explain:"Price discrimination requires: (1) market power, (2) ability to segment consumers by price elasticity, and (3) ability to prevent resale between market segments. Price takers cannot price discriminate."},
  {id:38,unit:4,diff:"hard",q:"In game theory, a dominant strategy is one that:",choices:["Produces the best outcome for both players","Is best for a player regardless of what the other player does","Requires cooperation between players","Maximizes the combined payoff of all players"],correct:1,explain:"A dominant strategy yields the highest payoff for a player no matter what strategy the opposing player chooses. It is the rational choice without knowing the opponent's move."},
  {id:39,unit:4,diff:"medium",q:"Deadweight loss occurs in monopoly because the monopolist:",choices:["Charges a price equal to marginal cost","Produces where MR = MC, but P > MC","Earns zero economic profit in the long run","Faces a perfectly elastic demand curve"],correct:1,explain:"The monopolist produces where MR = MC but charges a higher price (P > MC). Units between the competitive and monopoly output would create more value than they cost (MB > MC) but go unproduced, creating DWL."},
  {id:40,unit:4,diff:"hard",q:"If two firms in a duopoly both choose to cheat on a cartel agreement, this is an example of:",choices:["A cooperative Nash Equilibrium","The Prisoner's Dilemma outcome","Perfect competition","Monopolistic competition"],correct:1,explain:"In the Prisoner's Dilemma, each player follows their dominant strategy (cheating/defecting) even though mutual cooperation would yield better outcomes for both. This is the classic outcome in unstable cartels."},
  {id:41,unit:4,diff:"medium",q:"Which of the following is a characteristic of monopolistic competition but NOT perfect competition?",choices:["Many buyers and sellers","Free entry and exit","Product differentiation","No barriers to entry"],correct:2,explain:"Both market structures have many firms and free entry/exit. The key distinguishing feature of monopolistic competition is product differentiation — each firm sells a slightly different product and has some price-setting ability."},

  // UNIT 5
  {id:42,unit:5,diff:"easy",q:"The demand for labor is described as 'derived demand' because:",choices:["Workers demand higher wages each year","The demand for labor depends on the demand for the goods and services labor produces","Firms always hire from within","Labor markets are regulated by the government"],correct:1,explain:"Labor demand is derived (secondary) rather than primary. Firms hire workers to produce goods and services, so the demand for labor depends on consumer demand for those products."},
  {id:43,unit:5,diff:"medium",q:"A profit-maximizing firm will hire workers up to the point where:",choices:["The wage rate equals total revenue","Marginal revenue product equals the wage rate","Total product is maximized","Average product equals marginal product"],correct:1,explain:"MRP = W (or MFC) is the hiring rule. MRP is the additional revenue from hiring one more worker. If MRP > W, hire more; if MRP < W, hire fewer. Hire until MRP = W."},
  {id:44,unit:5,diff:"medium",q:"If a firm's product price increases while all else remains constant, what happens to the firm's demand for labor?",choices:["It decreases because workers become more expensive","It increases because the MRP of each worker rises","It remains unchanged","It depends on the elasticity of supply of labor"],correct:1,explain:"MRP = MP × P (product price). If the product's price rises, MRP increases at every level of employment, shifting the labor demand curve to the right — the firm wants to hire more workers."},
  {id:45,unit:5,diff:"hard",q:"A monopsonist in the labor market pays workers:",choices:["The MRP wage to maximize profit","A wage below the MRP, below the competitive wage","A wage above the competitive wage","The same wage as in a competitive market"],correct:1,explain:"A monopsonist (single buyer of labor) restricts hiring to drive down wages. It hires fewer workers and pays less than the competitive wage; workers are paid below their MRP, creating a deadweight loss."},
  {id:46,unit:5,diff:"hard",q:"If the minimum wage is set above the monopsony wage but below the competitive wage, what is the most likely outcome?",choices:["Employment falls below the monopsony level","Employment rises toward or equal to the competitive level","The monopsonist shuts down","A labor surplus is created"],correct:1,explain:"In a monopsony, a minimum wage set above the monopsony wage but below the competitive wage can actually increase employment by removing the monopsonist's ability to reduce hiring to lower wages. This is the unique case where minimum wage increases employment."},
  {id:47,unit:5,diff:"medium",q:"Which of the following would increase the demand for labor?",choices:["A decrease in the price of the firm's product","An improvement in labor productivity","An increase in the wage rate","An increase in the price of capital that complements labor"],correct:1,explain:"An improvement in labor productivity increases marginal product (MP). Since MRP = MP × P, higher MP shifts the MRP curve (labor demand) to the right. The firm finds each worker more valuable and wants to hire more."},
  {id:48,unit:5,diff:"medium",q:"In a competitive labor market, a firm's labor supply curve is:",choices:["Downward sloping","Perfectly elastic (horizontal) at the market wage","Upward sloping","Perfectly inelastic (vertical)"],correct:1,explain:"In a competitive labor market, an individual firm can hire as many workers as it wants at the prevailing market wage without affecting that wage. Its labor supply curve is horizontal (perfectly elastic) at the market wage."},

  // UNIT 6
  {id:49,unit:6,diff:"easy",q:"A negative externality exists when:",choices:["A firm earns excessive profits","Production or consumption imposes costs on third parties not reflected in the market price","The government taxes a good too heavily","A monopolist restricts output"],correct:1,explain:"A negative externality (spillover cost) occurs when a third party (not the buyer or seller) bears a cost from a market transaction. Examples include pollution from a factory affecting nearby residents."},
  {id:50,unit:6,diff:"medium",q:"In the presence of a negative production externality, the market will:",choices:["Underproduce relative to the socially optimal quantity","Overproduce relative to the socially optimal quantity","Produce at the socially optimal quantity","Produce zero output"],correct:1,explain:"When negative externalities exist, the true social cost (MSC) exceeds the private cost. The market ignores the external cost and overproduces relative to the social optimum (where MSC = MSB)."},
  {id:51,unit:6,diff:"medium",q:"A Pigouvian tax is designed to:",choices:["Raise government revenue by taxing luxury goods","Correct a market failure by making producers internalize the external cost of production","Prevent firms from earning economic profit","Protect domestic industries from foreign competition"],correct:1,explain:"A Pigouvian (corrective) tax equal to the marginal external cost shifts the private supply curve left, making producers pay the full social cost. This reduces output to the socially optimal level."},
  {id:52,unit:6,diff:"medium",q:"Which of the following is an example of a public good?",choices:["A cheeseburger from a fast food restaurant","A privately owned highway","National defense","Electricity from a utility company"],correct:2,explain:"A public good is non-excludable (you can't prevent someone from using it) and non-rival (one person's use doesn't reduce availability to others). National defense is the classic example."},
  {id:53,unit:6,diff:"hard",q:"The free-rider problem leads to:",choices:["Overproduction of public goods","Underproduction of public goods by the market","Efficient allocation of resources","Negative externalities"],correct:1,explain:"Because people can benefit from public goods without paying (non-excludability), rational individuals have an incentive to free ride. This leads to insufficient private funding and underproduction of public goods."},
  {id:54,unit:6,diff:"hard",q:"Adverse selection is a problem caused by:",choices:["Moral hazard after a transaction is complete","Asymmetric information before a transaction, leading to worse-quality goods dominating the market","A firm underproducing due to externalities","Government price controls"],correct:1,explain:"Adverse selection occurs before a transaction when one party has more information than the other (asymmetric information). It leads to markets being dominated by low-quality goods or high-risk individuals (e.g., 'lemons' in the used car market, or unhealthy people in unregulated insurance markets)."},
  {id:55,unit:6,diff:"medium",q:"A positive externality in consumption leads to:",choices:["Overproduction relative to the social optimum","Underproduction relative to the social optimum","Efficient market production","A surplus of the good"],correct:1,explain:"With positive externalities, the social benefit (MSB) exceeds private benefit. The market, ignoring these extra benefits, underproduces. Government can subsidize consumption to increase output to the socially optimal level."},
  {id:56,unit:6,diff:"medium",q:"Which government policy would most effectively correct a negative externality from pollution?",choices:["A price floor on the polluting good","A per-unit tax equal to the marginal external cost","A subsidy to the polluting firm","A price ceiling on the polluting good"],correct:1,explain:"A corrective tax equal to the marginal external cost (Pigouvian tax) forces the firm to internalize the pollution cost, shifting supply left to the social optimum and eliminating the overproduction."},
  {id:57,unit:6,diff:"hard",q:"Moral hazard occurs when:",choices:["Buyers have less information than sellers before a purchase","A party takes more risks after being protected from the consequences of those risks","A firm uses its market power to restrict output","Government regulations create inefficiency"],correct:1,explain:"Moral hazard is a post-contractual problem: once an individual is insured or protected from risk, they have less incentive to avoid risky behavior. Example: a car owner with full insurance may drive less carefully."},
  {id:58,unit:6,diff:"easy",q:"A good is non-excludable and non-rival in consumption. This good is classified as:",choices:["A private good","A club good","A public good","A common resource"],correct:2,explain:"The two characteristics of public goods are: (1) non-excludable — cannot exclude non-payers from using the good; (2) non-rival — one person's consumption does not reduce availability to others. Both conditions define a public good."},
  {id:59,unit:6,diff:"medium",q:"If a government provides a subsidy to firms producing a good with a positive externality, the likely result is:",choices:["The market price rises and output falls","Output increases toward the socially optimal level and price to consumers falls","Output decreases and the externality worsens","Consumer surplus decreases"],correct:1,explain:"A production subsidy lowers firms' costs, shifting supply right. This increases output and lowers price, moving production toward the social optimum where MSB = MSC. It helps correct underproduction caused by positive externalities."},
  {id:60,unit:6,diff:"hard",q:"In the market for a common resource (rival but non-excludable), what is the typical outcome without regulation?",choices:["Underuse due to high prices","Overuse leading to depletion — the Tragedy of the Commons","Efficient allocation by the market","Government monopoly over the resource"],correct:1,explain:"Common resources are rival (one person's use depletes it for others) but non-excludable (can't prevent use). Each user ignores the cost imposed on others, leading to overuse and depletion — the Tragedy of the Commons (Hardin, 1968)."}
];

const frqData = [
  {
    type:"Long FRQ",
    pts:10,
    unit:3,
    title:"Perfectly Competitive Firm & Market",
    scenario:"Candle-making is a perfectly competitive industry. A representative firm has the following cost structure: ATC is minimized at $12 per unit at an output of 100 units. The current market price is $16 per candle.",
    parts:[
      {text:"Draw a correctly labeled graph for the representative firm showing: (i) the profit-maximizing output and price, (ii) the area of economic profit.",pts:4},
      {text:"Explain what will happen to the number of firms in the industry in the long run and why.",pts:2},
      {text:"Draw a new graph showing the long-run equilibrium for the representative firm. Identify the long-run equilibrium price and output.",pts:2},
      {text:"If the government imposes a per-unit tax on candles, explain the short-run effect on the firm's output, price, and profit.",pts:2}
    ],
    rubric:{
      title:"Scoring Rubric (10 pts)",
      points:[
        "Part (a) – 4 pts: Correct downward-sloping D (horizontal at $16 for a competitive firm), U-shaped ATC, MC intersecting ATC at minimum, MR = MC at profit-max quantity, shaded profit rectangle = (P – ATC) × Q. Award 1 pt each for: correct label, profit-max quantity, price correctly identified, and profit area shaded.",
        "Part (b) – 2 pts: New firms will enter (1 pt) because there is economic profit (P > ATC), attracting new entrants (1 pt). Entry increases market supply, lowering the market price.",
        "Part (c) – 2 pts: Long-run graph shows price = $12 (minimum ATC), firm produces where P = MC = ATC. No profit area. 1 pt for correct price ($12 = min ATC), 1 pt for zero profit condition shown.",
        "Part (d) – 2 pts: Tax increases firm's variable costs, shifting ATC and MC up. Firm produces less output (1 pt) and earns reduced or negative economic profit in short run (1 pt). Market price will rise slightly in short run."
      ]
    }
  },
  {
    type:"Long FRQ",
    pts:10,
    unit:4,
    title:"Monopoly Analysis",
    scenario:"PharmaCo is a monopolist that produces a patented medication. The firm faces the following demand schedule: At Q=100, P=$50; at Q=200, P=$40; at Q=300, P=$30. The firm's marginal cost is constant at $10 per unit.",
    parts:[
      {text:"Draw a correctly labeled graph showing the monopolist's demand, marginal revenue, and marginal cost curves. Identify the profit-maximizing price and quantity.",pts:4},
      {text:"Shade and label the area of deadweight loss on your graph. Explain why deadweight loss occurs in monopoly.",pts:3},
      {text:"The government imposes a price ceiling equal to the competitive price (P = MC). Explain the effect on output, price, and deadweight loss.",pts:3}
    ],
    rubric:{
      title:"Scoring Rubric (10 pts)",
      points:[
        "Part (a) – 4 pts: Downward-sloping demand curve (1 pt). MR curve below demand, twice the slope (1 pt). Horizontal MC at $10 (1 pt). Profit-max at MR = MC → Q identified, then price read off demand curve above (1 pt).",
        "Part (b) – 3 pts: DWL triangle correctly identified between monopoly Q and competitive Q (where P=MC), bounded by demand curve above and MC below (2 pts). Explanation: DWL occurs because the monopolist produces where MR=MC but P>MC; units between monopoly Q and competitive Q have MB>MC but are not produced (1 pt).",
        "Part (c) – 3 pts: With P=MC price ceiling, monopolist acts like a competitive firm up to that price point (1 pt). Output increases to competitive level (1 pt). DWL is eliminated because all units where MB≥MC are now produced (1 pt)."
      ]
    }
  },
  {
    type:"Short FRQ",
    pts:5,
    unit:2,
    title:"Supply, Demand & Elasticity",
    scenario:"The market for avocados is in equilibrium. A severe drought in California destroys 40% of the avocado crop. Simultaneously, new research links avocado consumption to improved health outcomes.",
    parts:[
      {text:"Using a supply and demand diagram, show the combined effect of both events on the equilibrium price of avocados. Is the effect on price determinate? Explain.",pts:3},
      {text:"If the price elasticity of demand for avocados is −0.6, are avocados elastic or inelastic? Will total revenue for avocado farmers rise or fall as a result of the supply decrease (assuming the demand change is small)? Explain.",pts:2}
    ],
    rubric:{
      title:"Scoring Rubric (5 pts)",
      points:[
        "Part (a) – 3 pts: Supply decreases (shifts left) due to drought (1 pt). Demand increases (shifts right) due to health news (1 pt). Both shifts raise equilibrium price, so price increases is determinate (1 pt). The effect on equilibrium quantity is indeterminate (depends on relative shift magnitudes) — if stated, award credit.",
        "Part (b) – 2 pts: |PED| = 0.6 < 1, so demand is inelastic (1 pt). With inelastic demand, a supply decrease raises price more than it reduces quantity, so Total Revenue rises (P and TR move together when demand is inelastic) (1 pt)."
      ]
    }
  },
  {
    type:"Short FRQ",
    pts:5,
    unit:5,
    title:"Labor Markets & Factor Demand",
    scenario:"GreenBuild Co. is a perfectly competitive firm that hires workers in a competitive labor market. The wage rate is $120/day. Each additional worker produces the following: Worker 1: MP = 20 chairs/day; Worker 2: MP = 16; Worker 3: MP = 12; Worker 4: MP = 8. The market price of a chair is $10.",
    parts:[
      {text:"Calculate the Marginal Revenue Product (MRP) of each worker. How many workers should GreenBuild hire to maximize profit? Explain.",pts:3},
      {text:"If the market wage rises to $150/day, what is the new profit-maximizing number of workers? On a labor market graph, show the effect of this wage increase on the quantity of labor hired by the firm.",pts:2}
    ],
    rubric:{
      title:"Scoring Rubric (5 pts)",
      points:[
        "Part (a) – 3 pts: MRP = MP × P (product price). Worker 1: $200, Worker 2: $160, Worker 3: $120, Worker 4: $80 (1 pt for all four correct). Hire where MRP ≥ Wage ($120): Workers 1, 2, and 3 all have MRP ≥ $120. Worker 4 has MRP = $80 < $120. Hire 3 workers (1 pt). Explanation: Hire as long as additional revenue from hiring (MRP) ≥ additional cost (wage). Stop at Worker 3 where MRP = $120 = Wage (1 pt).",
        "Part (b) – 2 pts: At wage $150, Worker 3's MRP ($120) < $150, so only Workers 1 and 2 are hired (MRP ≥ $150). Hire 2 workers (1 pt). Graph shows downward-sloping MRP = labor demand curve, wage rises from $120 to $150 (horizontal line shifts up), and labor hired falls from 3 to 2 (1 pt)."
      ]
    }
  },
  {
    type:"Short FRQ",
    pts:5,
    unit:6,
    title:"Externalities & Government Policy",
    scenario:"A steel mill produces steel and also emits pollution into a nearby river. The marginal social cost of production is greater than the marginal private cost at every output level.",
    parts:[
      {text:"Draw a correctly labeled supply and demand graph showing the market equilibrium and the socially optimal output level. Shade the deadweight loss.",pts:3},
      {text:"Explain how a per-unit Pigouvian tax equal to the marginal external cost would correct this market failure.",pts:2}
    ],
    rubric:{
      title:"Scoring Rubric (5 pts)",
      points:[
        "Part (a) – 3 pts: Graph shows: S (= MPC, private supply) and D (= MPB = MSB) curves intersecting at market equilibrium Qm and Pm (1 pt). MSC curve above S, intersecting D at socially optimal Qs < Qm and Ps > Pm (1 pt). DWL triangle shaded between Qs and Qm, bounded by MSC above and D below — representing overproduction (1 pt).",
        "Part (b) – 2 pts: The Pigouvian tax = marginal external cost forces the firm to internalize the cost of pollution (1 pt). The tax shifts the supply curve (MPC) up to equal MSC, reducing output from Qm to Qs, the socially optimal level, and eliminating the deadweight loss (1 pt)."
      ]
    }
  },
  {
    type:"Short FRQ",
    pts:5,
    unit:1,
    title:"PPC & Comparative Advantage",
    scenario:"Country Alpha can produce 200 units of food or 100 units of clothing per year. Country Beta can produce 120 units of food or 80 units of clothing per year. Each country is currently producing at a point on its PPC.",
    parts:[
      {text:"Calculate the opportunity cost of food and clothing for each country. Which country has a comparative advantage in each good?",pts:3},
      {text:"If both countries specialize according to comparative advantage and trade, explain one way each country benefits from this trade.",pts:2}
    ],
    rubric:{
      title:"Scoring Rubric (5 pts)",
      points:[
        "Part (a) – 3 pts: Alpha OC of food = 0.5 clothing (100/200); Alpha OC of clothing = 2 food. Beta OC of food = 0.67 clothing (80/120); Beta OC of clothing = 1.5 food (1 pt for all four). Alpha has comparative advantage in food (lower OC: 0.5 < 0.67) (1 pt). Beta has comparative advantage in clothing (lower OC: 1.5 < 2) (1 pt).",
        "Part (b) – 2 pts: Each country can consume a combination of goods outside its own PPC (1 pt) — i.e., consume beyond what it could produce alone. Specialization increases total world production of both goods, and trade allows each country to consume more than it could produce in isolation (1 pt)."
      ]
    }
  }
];

const formulas = [
  { name:"Price Elasticity of Demand (PED)", expr:"PED = (%ΔQd) / (%ΔP)", desc:"Measures responsiveness of Qd to price change. |PED| > 1 = elastic; < 1 = inelastic; = 1 = unit elastic." },
  { name:"Price Elasticity of Supply (PES)", expr:"PES = (%ΔQs) / (%ΔP)", desc:"Measures responsiveness of Qs to price change. PES > 1 = elastic supply." },
  { name:"Income Elasticity of Demand", expr:"YED = (%ΔQd) / (%ΔIncome)", desc:"Positive = normal good. Negative = inferior good. > 1 = luxury good." },
  { name:"Cross-Price Elasticity", expr:"XED = (%ΔQd of A) / (%ΔP of B)", desc:"Positive → substitutes. Negative → complements." },
  { name:"Total Revenue", expr:"TR = P × Q", desc:"When demand is inelastic: ↑P → ↑TR. When elastic: ↑P → ↓TR." },
  { name:"Total Profit", expr:"π = TR – TC", desc:"Economic profit = TR – (explicit + implicit costs). Normal profit = zero economic profit." },
  { name:"Marginal Revenue", expr:"MR = ΔTR / ΔQ", desc:"For perfect competition: MR = P. For monopoly: MR < P (downward-sloping demand)." },
  { name:"Marginal Cost", expr:"MC = ΔTC / ΔQ = ΔVC / ΔQ", desc:"MC intersects AVC and ATC at their minimum points." },
  { name:"Average Total Cost", expr:"ATC = TC / Q = AFC + AVC", desc:"ATC is minimized where ATC = MC. In LR perfect competition: P = min ATC." },
  { name:"Average Fixed Cost", expr:"AFC = TFC / Q", desc:"AFC always decreases as Q increases (fixed cost spread over more units)." },
  { name:"Marginal Revenue Product", expr:"MRP = MP × MR (= MP × P in perfect comp.)", desc:"The MRP curve is the firm's labor demand curve. Hire until MRP = Wage." },
  { name:"Profit-Max (Output)", expr:"MR = MC", desc:"Applies to ALL market structures. Find Q where MR = MC, then find P from demand." },
  { name:"Profit-Max (Hiring)", expr:"MRP = MFC (= Wage in competitive mkt)", desc:"Hire labor until the revenue from the last worker equals their wage." },
  { name:"Consumer Surplus", expr:"CS = Area above P, below demand curve", desc:"Triangle = ½ × base × height when demand is linear." },
  { name:"Producer Surplus", expr:"PS = Area below P, above supply curve", desc:"Triangle = ½ × base × height when supply is linear." },
  { name:"Deadweight Loss (Tax/Monopoly)", expr:"DWL = ½ × (Q_competitive – Q_restricted) × ΔP", desc:"Triangle of foregone gains between market Q and restricted Q." },
  { name:"Shutdown Rule (SR)", expr:"Shut down if P < AVC (or TR < TVC)", desc:"Fixed costs are sunk in SR. If P ≥ AVC, firm covers variable costs and some fixed costs." },
  { name:"Opportunity Cost", expr:"OC of Good A = units of Good B given up", desc:"From PPC: OC of A = (units B) / (units A). Always think in terms of what is given up." }
];

const graphData = [
 
];

const guideData = [
  { unit:1, concepts:UNIT_CONCEPTS[1] },
  { unit:2, concepts:UNIT_CONCEPTS[2] },
  { unit:3, concepts:UNIT_CONCEPTS[3] },
  { unit:4, concepts:UNIT_CONCEPTS[4] },
  { unit:5, concepts:UNIT_CONCEPTS[5] },
  { unit:6, concepts:UNIT_CONCEPTS[6] }
];