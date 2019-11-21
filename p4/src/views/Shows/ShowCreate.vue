<template>
  <div class="m-4">
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>Create Show</h1>
      </b-col>
    </b-row>
    <Toast />
    <b-row class="pt-3 bg-white">
      <div class="card w-100">
        <!-- <div class="card-header">
        <h1 class="h3 m-0">Create Show</h1>
        </div>-->
        <div class="card-body">
          <div>
            <div class="form-group">
              <label for="sName" class="font-weight-bold">
                Show Name
                <span class="required">*</span>
              </label>
              <input
                type="text"
                v-model="showModel.sName"
                v-validate="'required'"
                placeholder="Show Name"
                id="sName"
                name="Name"
                class="form-control"
                :class="{ 'is-invalid': errors.has('Name') }"
                :maxlength="100"
              />
              <div v-if="errors.has('Name')" class="text-danger">{{ errors.first('Name') }}</div>
            </div>
            <!-- <div class="form-group">
            <label for="sSVenue" class="font-weight-bold">
              Venue
              <span class="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Venue"
              v-model="showModel.sVenue"
              v-validate="'required'"
              id="sSVenue"
              name="Venue"
              class="form-control"
              :class="{ 'is-invalid': errors.has('Venue') }"
              :maxlength="100"
            />
            <div v-if="errors.has('Venue')" class="text-danger">{{ errors.first('Venue') }}</div>
            </div>-->
            <div class="form-group">
              <label for="sDescription" class="font-weight-bold">
                Description
                <span class="required">*</span>
              </label>
              <ckeditor
                :editor="editor"
                class="form-control"
                v-model="showModel.sDescription"
                v-validate="'required'"
                rows="5"
                id="sDescription"
                name="Description"
                :class="{ 'is-invalid': errors.has('Description') }"
                :maxlength="5000"
                :config="editorConfig"
              ></ckeditor>
              <div
                v-if="errors.has('Description')"
                class="text-danger"
              >{{ errors.first('Description') }}</div>
            </div>
            <div class="form-group">
              <div for="dDate" class="mb-2 font-weight-bold">
                Show Date
                <span class="required">*</span>
              </div>
              <Calendar
                v-model="showModel.dDate"
                id="dDate"
                name="Date"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('Date') }"
                :showIcon="true"
                :showTime="true"
                :showSeconds="true"
                autocomplete="off"
              />
              <div v-if="errors.has('Date')" class="text-danger">{{ errors.first('Date') }}</div>
            </div>
            <div class="form-group">
              <label for="nPrice" class="font-weight-bold">
                Ticket Price
                <span class="required">*</span>
              </label>
              <input
                type="number"
                v-model="showModel.nTicketPrice"
                v-validate="'required'"
                placeholder="Ticket Price"
                id="nPrice"
                name="Price"
                min="1"
                class="form-control"
                :class="{ 'is-invalid': errors.has('Price') }"
                :maxlength="4"
              />
              <div v-if="errors.has('Price')" class="text-danger">{{ errors.first('Price') }}</div>
            </div>
            <div class="form-group">
              <div for="sGenreName" class="mb-2 font-weight-bold">
                Genre
                <span class="required">*</span>
              </div>
              <Dropdown
                v-model="selectedGenre"
                :options="genres"
                v-validate="'required'"
                name="Genre"
                optionLabel="sGenreName"
                placeholder="Select a Genre"
                @change="onChangeGenre"
                :class="{ 'is-invalid': errors.has('Genre') }"
                style="width: 210px !important;"
              />
              <div v-if="errors.has('Genre')" class="text-danger">{{ errors.first('Genre') }}</div>
            </div>
            <div class="form-group">
              <div for="sArtistName" class="mb-2 font-weight-bold">
                Artist
                <span class="required">*</span>
              </div>
              <Dropdown
                v-model="selectedArtist"
                :options="artists"
                v-validate="'required'"
                name="Artist"
                optionLabel="sArtistName"
                placeholder="Select a Artist"
                :class="{ 'is-invalid': errors.has('Artist') }"
                style="width: 210px !important;"
              />
              <div v-if="errors.has('Artist')" class="text-danger">{{ errors.first('Artist') }}</div>
            </div>
            <!-- <div class="form-group">
            <label for="dPhoneNo" class="font-weight-bold">
              Contact Number
              <span class="required">*</span>
            </label>
            <input
              type="text"
              v-model="showModel.sPhoneNo"
              v-validate="{ required: true, regex:/^[0-9]+$/ }"
              placeholder="Contact Number"
              id="dPhoneNo"
              name="ContactNumber"
              class="form-control"
              :class="{ 'is-invalid': errors.has('ContactNumber') }"
              :maxlength="12"
            />
            <div
              v-if="errors.has('ContactNumber')"
              class="text-danger"
            >{{ errors.first('ContactNumber') }}</div>
            </div>-->
            <div class="row">
              <div class="col-6">
                <button
                  class="btn btn-primary"
                  v-on:click="saveShow()"
                  type="submit"
                  v-bind:disabled="errors.any()"
                >Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import ShowService from "../../services/shows.service";
import moment from "moment";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";
import router from "../../router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "ShowCreate",
  created() {
    this.showService = new ShowService();
  },
  mounted() {
    let email = localStorage.getItem("Email");
    let password = localStorage.getItem("Password");
    if (email != AuthConfig.sEmail && password != AuthConfig.sPassword) {
      router.push({ name: "login" });
    } else {
      let _this = this;
      this.getGenre();
    }
  },
  data() {
    return {
      messages: [],
      genres: [],
      artists: [],
      selectedGenre: null,
      selectedArtist: null,
      showModel: {
        sName: undefined,
        sDescription: undefined,
        dDate: null,
        // sVenue: undefined,
        nTicketPrice: undefined,
        // sPhoneNo: undefined,
        nGenreId: undefined
      },
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        toolbar: {
          items: ["bold", "italic", "undo", "redo"]
        }
      }
    };
  },
  methods: {
    getGenre() {
      this.showService.getGenre().then(response => {
        this.genres = this.alphaSortByKey(response.data, "nGenreId");
      });
    },
    alphaSortByKey: function(arr, key) {
      arr.sort(function(a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      return arr;
    },
    onChangeGenre() {
      let genreId = this.selectedGenre.nGenreId;
      this.showService.getArtistByGenre(genreId).then(response => {
        this.artists = this.alphaSortByKey(response.data, "nArtistId");
      });
    },
    saveShow() {
      this.$validator.validate().then(valid => {
        if (valid) {
          let objRequest = {
            sName: this.showModel.sName.replace(/\s+/g, " ").trim(),
            sDescription: this.showModel.sDescription,
            dDate: this.formatDate(this.showModel.dDate),
            // sVenue: this.showModel.sVenue.replace(/\s+/g, " ").trim(),
            nTicketPrice: this.showModel.nTicketPrice,
            // sPhoneNo: this.showModel.sPhoneNo,
            nGenreId: this.selectedGenre.nGenreId,
            nArtistId: this.selectedArtist.nArtistId,
            start: this.formatDate(this.showModel.dDate),
            title: this.showModel.sName.replace(/\s+/g, " ").trim()
          };

          this.showService.saveShow(objRequest).then(response => {
            if (response.status == 201) {
              this.$toast.add({
                severity: "success",
                summary: "Success Message",
                detail: CommonMessageConfig.SaveSuccessfully,
                life: 1500
              });
              setTimeout(() => {
                router.push({ name: "Shows" });
              }, 1000);

              // window.location.reload();
            } else {
              this.$toast.add({
                severity: "error",
                summary: "Error Message",
                detail: CommonMessageConfig.ErrorMessage,
                life: 1500
              });
            }
          });
        }
      });
    },
    formatDate(date) {
      return moment(date).format();
    }
  }
};
</script>