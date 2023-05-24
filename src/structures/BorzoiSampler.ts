export class BorzoiSampler { // Sampler Object that represents the sampler. (WHATTHEFUCK WHAT IS THIS PHRASE LOL)
  name: string;
  aliases: any;
  options: {};
  constructor(sampler: any) {
    this.name = sampler.name;
    this.aliases = sampler.aliases;
    this.options = sampler.options;
  }
}
