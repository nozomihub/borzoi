export class BorzoiSampler {
  name: string;
  aliases: any;
  options: {};
  constructor(sampler: any) {
    this.name = sampler.name;
    this.aliases = sampler.aliases;
    this.options = sampler.options;
  }
}
