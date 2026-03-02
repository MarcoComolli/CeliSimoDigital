export class Status {
  public loginTry = 0;
  public loginRequiredTries = 10;
  public enableUppercase = false;
  public phase = 0;
  public challenges = new Prove();

}

export class Prove {
  geoHunter: ProvaBase = new ProvaBase();
  narutodleClassic: ProvaBase = new ProvaBase();
  narutodleJutsu: ProvaBase = new ProvaBase();
  narutodleEye: ProvaBase = new ProvaBase();
  pokedleClassic: ProvaBase = new ProvaBase();
  pokedleCard: ProvaBase = new ProvaBase();
  pokedleDescription: ProvaBase = new ProvaBase();
  pokedleImage: ProvaBase = new ProvaBase();
  globleClassic: ProvaBase = new ProvaBase();
  globleShape: ProvaBase = new ProvaBase();
  flags: ProvaBase = new ProvaBase();
  songs: ProvaBase = new ProvaBase();
  accordionsAudio: ProvaBase = new ProvaBase();
  voices: ProvaBase = new ProvaBase();
  rickRoll: ProvaBase = new ProvaBase();
}

class ProvaBase {
  public isSuccess: boolean = false;
  public result = "";
  public isConfirmed: boolean = false;
}

