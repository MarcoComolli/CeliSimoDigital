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
}

class ProvaBase {
  public isSuccess: boolean = false;
  public result = "";
  public isConfirmed: boolean = false;
}

class GeoHunterProva extends ProvaBase {

}
